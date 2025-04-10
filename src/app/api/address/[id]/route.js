import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  deleteAddress,
  GetAddress,
  updateAddress,
} from "@/backend/services/address_service";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

import onError from "@/backend/middlewares/errors";
import errorHandler from "@/backend/middlewares/errors";

const handler = createRouter({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);

export async function GET(request) {
  try {
    return await GetAddress(request);
  } catch (err) {
    return errorHandler(err);
  }
}
