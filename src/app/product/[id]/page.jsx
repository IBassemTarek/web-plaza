import ProductDetails from "@/components/products/ProductDetails";
import React from "react";
import { cookies } from "next/headers";
import instance from "@/lib/axios";
const getProductDetails = async (id = null) => {
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

const ProductDetailsPage = async ({ params = null }) => {
  const product = await getProductDetails(params?.id);

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
