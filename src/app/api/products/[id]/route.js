import dbConnect from "@/backend/config/dbConnect";
import { GetProduct } from "@/backend/services/product_service";

export async function GET(_, context) {
  const { params } = context;
  dbConnect();
  return await GetProduct(params?.id);
}
