import User from "../models/user";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";
import { NextResponse } from "next/server";

export const registerUser = async (req, res) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      { status: 500 }
    );
  }
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
