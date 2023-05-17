import Profile from "@/components/auth/Profile";
// import axios from "axios";
import React from "react";

// import { cookies } from "next/headers";

const getAddresses = async () => {
  // const nextCookies = cookies();

  // const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const res = await fetch(`${process.env.API_URL}/api/address`, {
    mode: "cors",
    credentials: "include",
  });
  // const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
  //   headers: {
  //     Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
  //   },
  // });
  const json = await res.json();

  return json?.addresses;
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
