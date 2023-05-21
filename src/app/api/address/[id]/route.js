import dbConnect from "@/backend/config/dbConnect";
import {
  DeleteAddress,
  GetAddress,
  UpdateAddress,
} from "@/backend/services/address_service";
import cors from "@/backend/utils/cors";

export async function GET(request, context) {
  const { params } = context;
  dbConnect();
  return await GetAddress(params?.id, request);
}

export async function PUT(request, context) {
  const { params } = context;
  dbConnect();
  return cors(request, await UpdateAddress(params?.id, request));
}

export async function DELETE(request, context) {
  const { params } = context;
  dbConnect();
  return cors(request, await DeleteAddress(params?.id, request));
}
