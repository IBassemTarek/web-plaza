import { getToken } from "next-auth/jwt";
import { isAuthenticatedUser } from "../middlewares/auth";
import Address from "../models/address";

export const NewAddress = async (req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (user) {
    const data = await req.json();
    const userId = JSON.parse(user.data);
    data.user = userId._id;
    const address = await Address.create(data);
    return new Response(JSON.stringify(address), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "unAuthorized" }), {
      status: 401,
    });
  }
};

export const GetAddresses = async (req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (user) {
    const userId = JSON.parse(user.data);
    const addresses = await Address.find({ user: userId._id });
    return new Response(JSON.stringify(addresses), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "unAuthorized" }), {
      status: 401,
    });
  }
};

export const GetAddress = async (id, req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const address = await Address.findById(id);

  if (!address) {
    return new Response(JSON.stringify({ message: "Address not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(address), {
    status: 200,
  });
};

export const UpdateAddress = async (id, req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  let address = await Address.findById(id);

  if (!address) {
    return new Response(JSON.stringify({ message: "Address not found" }), {
      status: 404,
    });
  }
  const data = await req.json();

  address = await Address.findByIdAndUpdate(id, data);

  return new Response(JSON.stringify(address), {
    status: 200,
  });
};

export const DeleteAddress = async (id, req) => {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user = isAuthenticatedUser(session?.user?.accessToken);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  let address = await Address.findById(id);

  if (!address) {
    return new Response(JSON.stringify({ message: "Address not found" }), {
      status: 404,
    });
  }

  await Address.findByIdAndDelete(id);

  return new Response(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
};
