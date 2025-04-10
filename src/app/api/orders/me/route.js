import dbConnect from "@/backend/config/dbConnect";
import errorHandler from "@/backend/middlewares/errors";
import { myOrders } from "@/backend/services/orderService";

dbConnect();

export async function GET(request) {
  try {
    return await myOrders(request);
  } catch (err) {
    return errorHandler(err);
  }
}
