import dbConnect from "@/backend/config/dbConnect";
import { GetProduct, GetProducts } from "@/backend/services/product_service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  dbConnect();
  return await GetProducts(searchParams);
}
