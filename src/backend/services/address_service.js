import { getToken } from "next-auth/jwt";
import { isAuthenticatedUser } from "../middlewares/auth";
import Address from "../models/address";
import ErrorHandler from "../utils/errorHandler";

export const NewAddress = async (req, res) => {
  req.body.user = req.user._id;

  const address = await Address.create(req.body);

  res.status(200).json({
    address,
  });
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

export const getAddress = async (req, res, next) => {
  const address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  res.status(200).json({
    address,
  });
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
