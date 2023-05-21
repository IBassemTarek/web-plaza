import { getToken } from "next-auth/jwt";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { isAuthenticatedUser } from "../middlewares/auth";

export const RegisterUser = async (req) => {
  const { name, email, password } = await req.json();
  const userData = await User.findOne({ email });
  if (userData) {
    return new Response(
      JSON.stringify({ message: "User already exists with this email" }),
      {
        status: 400,
      }
    );
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  return new Response(JSON.stringify(user), {
    status: 201,
  });
};

export const UpdateProfile = async (req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userAuth = isAuthenticatedUser(session?.user?.accessToken);
  const userId = JSON.parse(userAuth.data);
  if (!userAuth) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const userData = await User.findById(userId._id);
  const data = await req.json();
  const newUserData = {
    name: data?.name || userData.name,
    email: data?.email || userData.email,
  };
  const user = await User.findByIdAndUpdate(userId._id, newUserData);
  return new Response(JSON.stringify(user), {
    status: 200,
  });
};

export const UpdatePassword = async (req) => {
  const data = await req.json();
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userAuth = isAuthenticatedUser(session?.user?.accessToken);
  if (!userAuth) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = JSON.parse(userAuth.data);

  const user = await User.findById(userId._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(
    data.currentPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return new Response(
      JSON.stringify({ message: "Old password is incorrect" }),
      {
        status: 400,
      }
    );
  }

  user.password = data.newPassword;
  await user.save();

  return new Response(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
};
