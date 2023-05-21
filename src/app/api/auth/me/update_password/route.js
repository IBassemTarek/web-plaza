import dbConnect from "@/backend/config/dbConnect";
import { UpdatePassword } from "@/backend/services/auth_service";

export async function PUT(request) {
  dbConnect();
  return await UpdatePassword(request);
}
