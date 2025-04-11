"use client";
import React, { useContext, useEffect, useState } from "react";
import UserAddresses from "./user/UserAddresses";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProtectRoute from "./auth/ProtectRoute";

const ClientProfile = ({ serverAddresses }) => {
  const { user } = useContext(AuthContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState(
    serverAddresses || { addresses: [] }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Show loading state
  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Handle not authenticated state
  if (status === "unauthenticated") {
    return null; // Will redirect in useEffect
  }

  return (
    <ProtectRoute>
      <div className="container mx-auto px-4 py-5">
        <div className="bg-white shadow rounded-lg p-6">
          <figure className="flex items-start sm:items-center mb-4">
            <div className="mr-4 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0) || session?.user?.name?.charAt(0) || "U"}
            </div>
            <figcaption>
              <h5 className="font-semibold text-lg">
                {user?.name || session?.user?.name}
              </h5>
              <p>
                <b>Email:</b> {user?.email || session?.user?.email} |
                <b> Joined On:</b>{" "}
                {user?.createdAt?.substring(0, 10) ||
                  new Date().toISOString().substring(0, 10)}
              </p>
            </figcaption>
          </figure>

          <hr className="my-4" />

          <UserAddresses addresses={addresses.addresses || []} />

          <Link href="/address/new">
            <button className="px-4 py-2 inline-block bg-black text-white border border-transparent rounded-md">
              <i className="mr-1 fa fa-plus"></i> Add new address
            </button>
          </Link>

          <hr className="my-4" />
        </div>
      </div>
    </ProtectRoute>
  );
};

export default ClientProfile;
