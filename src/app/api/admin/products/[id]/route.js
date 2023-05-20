import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import {
  deleteProduct,
  updateProduct,
} from "@/backend/services/product_service";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteProduct);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateProduct);

export default handler;
