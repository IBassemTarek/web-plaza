import React from "react";
import UpdateProduct from "@/components/admin/UpdateProduct";

import { cookies } from "next/headers";
import instance from "@/lib/axios";
const getProduct = async (id = null) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await instance.get(
    `${process.env.API_URL}/api/products/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
};

const UpdateProductPage = async ({ params = null }) => {
  const Product = await getProduct(params?.id);

  return <UpdateProduct id={params?.id} productData={Product} />;
};

export default UpdateProductPage;
