import User from "../models/user";
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
