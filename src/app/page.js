import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";

import { cookies } from "next/headers";

const getProducts = async () => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
};

const HomePage = async () => {
  const productsData = await getProducts();

  return <ListProducts data={productsData} />;
};

export default HomePage;
