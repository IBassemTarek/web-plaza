"use client";

import React, { useContext, useEffect } from "react";
import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = ({ addresses }) => {
  const { user } = useContext(AuthContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {user?.createdAt.substring(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses addresses={addresses} />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block bg-black text-white border border-transparent rounded-md">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
