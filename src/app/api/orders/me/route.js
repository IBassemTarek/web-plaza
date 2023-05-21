import dbConnect from "@/backend/config/dbConnect";
import { MyOrders } from "@/backend/services/order_service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  dbConnect();
  return await MyOrders(request, searchParams);
}
