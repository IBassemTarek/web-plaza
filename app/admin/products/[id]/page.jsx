"use client";

import axios from "axios";
import React from "react";
import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
  const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);
  return data?.product;
};

const UpdateProductPage = async ({ params }) => {
  const Product = await getProduct(params?.id);

  return <UpdateProduct id={params?.id} productData={Product} />;
};

export default UpdateProductPage;
