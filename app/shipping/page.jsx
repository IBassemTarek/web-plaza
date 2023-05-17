import React from "react";

import { cookies } from "next/headers";
import Shipping from "@/components/cart/Shipping";

const getCookie = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  return `next-auth.session-token=${nextAuthSessionToken?.value}`;
};

const ShippingPage = async () => {
  const Cookie = await getCookie();

  return <Shipping cookie={Cookie} />;
};

export default ShippingPage;
