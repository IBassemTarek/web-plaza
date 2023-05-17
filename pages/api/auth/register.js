import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { registerUser } from "@/backend/services/authService";
import onError from "@/backend/middlewares/errors";
import { allowCors } from "@/backend/utils/init-middleware";

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default allowCors(handler);
