import dbConnect from "@/backend/config/dbConnect";
import errorHandler from "@/backend/middlewares/errors";
import { CheckoutSession } from "@/backend/services/orderService";

dbConnect();

export async function POST(request) {
  try {
    return await CheckoutSession(request);
  } catch (err) {
    return errorHandler(err);
  }
}
