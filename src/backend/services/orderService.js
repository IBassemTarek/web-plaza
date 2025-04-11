import { getToken } from "next-auth/jwt";
import Order from "../models/order";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "../middlewares/auth";

export const myOrders = async (req, res) => {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const user = isAuthenticatedUser(session?.user?.accessToken);
    if (user) {
      const userId = JSON.parse(user.data);
      const orders = await Order.find({ user: userId._id });
      return new Response(JSON.stringify(orders), {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
};

export const CheckoutSession = async (req, res) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not authenticated",
      },
      { status: 401 }
    );
  }
  const userData = JSON.parse(user.data);

  const userId = userData._id;

  const body = await req.json();
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
    user: userId,
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
  await Order.create(orderData);
  return NextResponse.json(
    {
      success: true,
      url: `${process.env.NEXT_PUBLIC_API_URL}/me/orders?order_success=true`,
    },
    { status: 200 }
  );
};
