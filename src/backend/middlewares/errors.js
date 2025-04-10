import { NextResponse } from "next/server"; // Import NextResponse from 'next/server'
import ErrorHandler from "../utils/errorHandler";

export default function errorHandler(err, req, next) {
  let error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // Now, return the error using NextResponse (as the new structure expects this)
  return new NextResponse(
    JSON.stringify({
      success: false,
      error,
      message: error.message,
      stack: error.stack,
    }),
    {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
}
