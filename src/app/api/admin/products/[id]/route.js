import dbConnect from "@/backend/config/dbConnect";
import cors from "@/backend/utils/cors";
import {
  DeleteProduct,
  UpdateProduct,
} from "@/backend/services/product_service";

export async function DELETE(request, context) {
  const { params } = context;
  dbConnect();
  return await DeleteProduct(params?.id, request);
}

export async function PUT(request, context) {
  const { params } = context;
  dbConnect();
  return cors(request, await UpdateProduct(params?.id, request));
}
