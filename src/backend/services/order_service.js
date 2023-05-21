import { getToken } from "next-auth/jwt";
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import { isAuthenticatedUser } from "../middlewares/auth";

export const MyOrders = async (req, searchParams) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = JSON.parse(user.data);
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments({ user: userId._id });

  const apiFilters = new APIFilters(
    Order.find({ user: userId._id }),
    searchParams
  ).pagination(resPerPage);

  const orders = await apiFilters.query
    .find({ user: userId._id })
    .populate("shippingInfo user");

  return new Response(
    JSON.stringify({
      ordersCount,
      resPerPage,
      orders,
    }),
    {
      status: 200,
    }
  );
};

export const CheckoutSession = async (req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = JSON.parse(user.data);

  const data = await req.json();

  const shippingInfo = data?.shippingInfo;
  const orderData = {
    user: userId._id,
    shippingInfo,
    orderItems: data?.items?.map((item) => {
      return {
        product: item?.product,
        name: item?.name,
        quantity: item?.quantity,
        image: item?.image,
        price: item?.price,
      };
    }),
  };
  await Order.create(orderData);
  return new Response(
    JSON.stringify({
      url: `${process.env.API_URL}/me/orders?order_success=true`,
    }),
    {
      status: 200,
    }
  );
};
