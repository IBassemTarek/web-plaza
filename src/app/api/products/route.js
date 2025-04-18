import dbConnect from "@/backend/config/dbConnect";
import { GetProducts } from "@/backend/services/product_service";

export async function GET() {
  dbConnect();
  return await GetProducts();
}
