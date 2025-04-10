import { getToken } from "next-auth/jwt";
import { isAuthenticatedUser } from "../middlewares/auth";
import Address from "../models/address";
import ErrorHandler from "../utils/errorHandler";
import { NextResponse } from "next/server";

export const NewAddress = async (req, res) => {
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

  // Add the user ID to the request body
  body.user = userId;
  try {
    const address = await Address.create(body);

    return NextResponse.json(
      {
        success: true,
        address,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error creating address",
      },
      { status: 500 }
    );
  }
};

export const GetAddresses = async (req, res) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (user) {
    const userId = JSON.parse(user.data);
    const addresses = await Address.find({ user: userId._id });
    return new Response(JSON.stringify(addresses), {
      status: 200,
    });
  }
};

export const GetAddress = async (req) => {
  const address = await Address.findById(req?.query?.id);

  if (!address) {
    return NextResponse.json(
      {
        success: true,
        message: "Address not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      address,
    },
    { status: 200 }
  );
};

export const updateAddress = async (req, res, next) => {
  let address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  address = await Address.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({
    address,
  });
};

export const deleteAddress = async (req, res, next) => {
  let address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  await address.remove();

  res.status(200).json({
    success: true,
  });
};
