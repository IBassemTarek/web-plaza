import dbConnect from "@/backend/config/dbConnect";
import { NewProduct } from "@/backend/services/product_service";
import cors from "@/backend/utils/cors";

export async function POST(request) {
  dbConnect();
  return cors(request, await NewProduct(request));
}
