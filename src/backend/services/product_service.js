import { getToken } from "next-auth/jwt";
import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { isAuthenticatedUser } from "../middlewares/auth";

export const NewProduct = async (req) => {
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
  const userId = JSON.parse(user.data);

  const data = await req.json();
  data.user = userId._id;

  const product = await Product.create(data);
  return new Response(JSON.stringify(product), {
    status: 201,
  });
};

export const UpdateProduct = async (id, req) => {
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
  let product = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "product not found" }), {
      status: 404,
    });
  }
  const data = await req.json();
  product = await Product.findByIdAndUpdate(id, data);
  return new Response(JSON.stringify(product), {
    status: 200,
  });
};

export const DeleteProduct = async (id, req) => {
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
  let product = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ message: "product not found" }), {
      status: 404,
    });
  }

  await Product.findByIdAndDelete(id);

  return new Response(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
};

export const GetProducts = async (searchParams) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), searchParams)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();
  return new Response(
    JSON.stringify({
      productsCount,
      resPerPage,
      filteredProductsCount,
      products,
    }),
    {
      status: 200,
    }
  );
};

export const GetProduct = async (id) => {
  if (!id) {
    return new Response(
      JSON.stringify({
        error: "Please enter product id",
      }),
      {
        status: 400,
      }
    );
  }

  const product = await Product.findById(id);

  if (!product) {
    return new Response(
      JSON.stringify({
        error: "Product not found.",
      }),
      {
        status: 404,
      }
    );
  }
  return new Response(JSON.stringify(product), {
    status: 200,
  });
};
