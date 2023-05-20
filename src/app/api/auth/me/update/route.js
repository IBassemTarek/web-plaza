import dbConnect from "@/backend/config/dbConnect";
import { UpdateProfile } from "@/backend/services/auth_service";

export async function PUT(request) {
  dbConnect();
  return await UpdateProfile(request);
}
