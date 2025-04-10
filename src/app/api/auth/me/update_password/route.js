import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { updatePassword } from "@/backend/services/auth_service";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = createRouter({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updatePassword);

export default handler;
