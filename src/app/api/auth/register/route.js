import dbConnect from "@/backend/config/dbConnect";
import { registerUser } from "@/backend/services/auth_service";
import errorHandler from "@/backend/middlewares/errors";

dbConnect();

export async function POST(req) {
  try {
    return await registerUser(req);
  } catch (err) {
    return errorHandler(err);
  }
}
