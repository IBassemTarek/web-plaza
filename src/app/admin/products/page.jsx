import React from "react";
import queryString from "query-string";
import Products from "@/components/admin/Products";
import instance from "@/lib/axios";

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams?.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await instance.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return data;
};

const MyProducts = async ({ searchParams }) => {
  const data = await getProducts(searchParams);

  return <Products data={data} />;
};

export default MyProducts;
