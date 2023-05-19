import axios from "axios";
import React from "react";
import UpdateProduct from "@/components/admin/UpdateProduct";

import { cookies } from "next/headers";
const getProduct = async (id = null) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data?.product;
};

const UpdateProductPage = async ({ params = null }) => {
  const Product = await getProduct(params?.id);

  return <UpdateProduct id={params?.id} productData={Product} />;
};

export default UpdateProductPage;
