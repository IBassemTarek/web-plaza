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

export const getProducts = async (req, res, next) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  res.status(200).json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

export const getProduct = async (req, res, next) => {
  if (!req?.query?.id) {
    return next(new ErrorHandler("Please enter product id", 400));
  }
  const product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({
      error: "Product not found.",
    });
  }

  res.status(200).json({
    product,
  });
};
