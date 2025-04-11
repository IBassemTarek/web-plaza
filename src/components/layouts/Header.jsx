"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";
import { useSession } from "next-auth/react";

const Header = () => {
  const { user, refreshUserSession } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;
  const { data: session } = useSession();

  // Add an effect to ensure session sync
  useEffect(() => {
    // If there's a session but no user in context, refresh the user context
    if (session?.user && !user) {
      refreshUserSession();
    }
  }, [session, user, refreshUserSession]);

  // User profile click handler with pre-fetch
  const handleProfileClick = async (e) => {
    // Only perform this if there's a user
    if (user) {
      // Optional: You could prefetch the profile page here
      // This helps ensure the session is ready before navigation
      await refreshUserSession();
    }
  };

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex-shrink-0 mr-5">
            <a href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="webplaza"
              />
            </a>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartItems?.length || 0}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Link href="/me" onClick={handleProfileClick}>
                <div className="cursor-pointer space-x-3 w-10 h-10 bg-black text-white rounded-full overflow-hidden flex justify-center items-center">
                  <p>{user?.name?.charAt(0) || "U"}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
