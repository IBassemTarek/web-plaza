import dbConnect from "@/backend/config/dbConnect";
import { GetAddresses, NewAddress } from "@/backend/services/address_service";

export async function GET(request) {
  dbConnect();
  return await GetAddresses(request);
}

export async function POST(request) {
  dbConnect();
  return await NewAddress(request);
}
