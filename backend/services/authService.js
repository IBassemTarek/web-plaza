import User from "../models/user";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";
import { initMiddleware } from "@/backend/utils/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
  })
);

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  await cors(req, res);
  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    user,
  });
};

export const updateProfile = async (req, res) => {
  const userData = await User.findById(req.user._id);
  const newUserData = {
    name: req.body?.name || userData.name,
    email: req.body?.email || userData.email,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newUserData);
  res.status(200).json({
    user,
  });
};

export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
  });
};
