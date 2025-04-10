import dbConnect from "@/backend/config/dbConnect";
import { registerUser } from "@/backend/services/auth_service";
import errorHandler from "@/backend/middlewares/errors";

// Connect to DB
dbConnect();

// POST method handler
export async function POST(req) {
  try {
    return await registerUser(req);
  } catch (err) {
    return errorHandler(err);
  }
}
