import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { registerUser } from "@/backend/services/authService";
import onError from "@/backend/middlewares/errors";
import { corsMW } from "@/backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(corsMW).post(registerUser);

export default handler;
