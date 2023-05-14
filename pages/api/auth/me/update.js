import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/services/authService";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/utils/multer";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;
