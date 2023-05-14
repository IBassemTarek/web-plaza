import NewProduct from "@/components/admin/NewProduct";
import React from "react";

import { cookies } from "next/headers";

const getToken = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  return nextAuthSessionToken?.value;
};

const NewProductPage = async () => {
  const token = await getToken();
  return <NewProduct token={token} />;
};

export default NewProductPage;
