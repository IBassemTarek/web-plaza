import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";

import queryString from "query-string";
import { cookies } from "next/headers";

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

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchQuery}`,
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
