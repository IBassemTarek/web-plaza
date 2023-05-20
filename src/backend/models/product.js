import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: ["Electronics", "Gaming", "Fashion", "Grocery"],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product =
  mongoose.models && "Product" in mongoose.models
    ? mongoose.models.Product
    : mongoose.model("Product", productSchema);
export default Product;
