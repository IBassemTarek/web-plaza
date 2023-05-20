import Order from "../models/order";
import APIFilters from "../utils/APIFilters";

export const myOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const checkoutSession = async (req, res) => {
  const body = req.body;

  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo;
  const orderData = {
    user: req?.user?._id,
    shippingInfo,
    orderItems: body?.items?.map((item) => {
      return {
        product: item?.product,
        name: item?.name,
        quantity: item?.quantity,
        image: item?.image,
        price: item?.price,
      };
    }),
  };
  const order = await Order.create(orderData);
  res.status(200).json({
    url: `${process.env.API_URL}/me/orders?order_success=true`,
  });
};
