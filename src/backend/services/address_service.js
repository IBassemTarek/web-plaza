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

export const GetAddress = async (req, id) => {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const user = isAuthenticatedUser(session?.user?.accessToken);
    if (user) {
      const address = await Address.findById(id);

      if (!address) {
        return NextResponse.json(
          {
            success: false,
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

export const updateAddress = async (req, id) => {
  let address = await Address.findById(id);

  if (!address) {
    return NextResponse.json(
      {
        success: false,
        message: "Address not found",
      },
      { status: 404 }
    );
  }

  const body = await req.json();
  address = await Address.findByIdAndUpdate(id, body);

  return NextResponse.json(
    {
      success: true,
      address,
    },
    { status: 200 }
  );
};

export const deleteAddress = async (req, id) => {
  let address = await Address.findById(id);

  if (!address) {
    return NextResponse.json(
      {
        success: false,
        message: "Address not found",
      },
      { status: 404 }
    );
  }

  // Delete the address
  await Address.findByIdAndDelete(id);

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
};
