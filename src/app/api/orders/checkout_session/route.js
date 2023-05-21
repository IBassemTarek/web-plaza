import dbConnect from "@/backend/config/dbConnect";
import { CheckoutSession } from "@/backend/services/order_service";
import cors from "@/backend/utils/cors";

export async function POST(request) {
  dbConnect();
  return cors(request, await CheckoutSession(request));
}
