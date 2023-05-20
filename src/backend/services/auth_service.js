import User from "../models/user";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    user,
  });
};

export const UpdateProfile = async (req) => {
  const userData = await User.findById(req.user._id);
  const newUserData = {
    name: req.body?.name || userData.name,
    email: req.body?.email || userData.email,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newUserData);
  return new Response(JSON.stringify(user), {
    status: 200,
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
