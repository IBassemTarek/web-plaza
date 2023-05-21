import React from "react";
import ListProducts from "@/components/products/ListProducts";

import queryString from "query-string";
import { cookies } from "next/headers";
import instance from "@/lib/axios";

const getProducts = async (searchParams) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await instance.get(
    `${process.env.API_URL}/api/products?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
};

const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default HomePage;
