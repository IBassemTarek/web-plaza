import dbConnect from "@/backend/config/dbConnect";
import errorHandler from "@/backend/middlewares/errors";
import { GetAddresses, NewAddress } from "@/backend/services/address_service";
dbConnect();

export async function GET(request) {
  try {
    return await GetAddresses(request);
  } catch (err) {
    return errorHandler(err);
  }
}

export async function POST(request) {
  try {
    return await NewAddress(request);
  } catch (err) {
    return errorHandler(err);
  }
}
