import Product from "../models/product";
import APIFilters from "../utils/APIFilters";

export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
};

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.query.id, req.body);
  res.status(200).json({
    product,
  });
};

export const deleteProduct = async (req, res) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
  });
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
