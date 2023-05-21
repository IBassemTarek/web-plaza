import dbConnect from "@/backend/config/dbConnect";
import { RegisterUser } from "@/backend/services/auth_service";
import cors from "@/backend/utils/cors";

export async function POST(request) {
  dbConnect();
  return cors(request, await RegisterUser(request));
}
