import dbConnect from "@/backend/config/dbConnect";
import {
  deleteAddress,
  GetAddress,
  updateAddress,
} from "@/backend/services/address_service";

import onError from "@/backend/middlewares/errors";
import errorHandler from "@/backend/middlewares/errors";

dbConnect();

// const handler = createRouter({ onError });
// handler.use(isAuthenticatedUser).put(updateAddress);
// handler.use(isAuthenticatedUser).delete(deleteAddress);

export async function GET(request, { params }) {
  const id = params.id;

  try {
    return await GetAddress(request, id);
  } catch (err) {
    return errorHandler(err);
  }
}

export async function PUT(request, { params }) {
  const id = params.id;

  try {
    return await updateAddress(request, id);
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    return await deleteAddress(request, id);
  } catch (err) {
    return errorHandler(err);
  }
}
