import Profile from "@/components/auth/Profile";
import React from "react";

import { cookies } from "next/headers";
import instance from "@/lib/axios";

const getAddresses = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await instance.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });
  return data;
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
