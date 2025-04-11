"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, refreshUserSession } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;
  const router = useRouter();
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  // Handle profile click with manual navigation instead of Link
  const handleProfileClick = async (e) => {
    e.preventDefault(); // Prevent the default Link behavior

    if (!user) {
      router.push("/login");
      return;
    }

    setIsProfileClicked(true);

    try {
      // Try to refresh the session before navigating
      await refreshUserSession();

      // Use router.push instead of relying on the Link component
      router.push("/me");
    } catch (error) {
      console.error("Failed to navigate to profile:", error);
      router.push("/login");
    } finally {
      setIsProfileClicked(false);
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
              // Use a button instead of Link for more control
              <a
                href="#"
                onClick={handleProfileClick}
                className="cursor-pointer"
                disabled={isProfileClicked}
              >
                <div className="space-x-3 w-10 h-10 bg-black text-white rounded-full overflow-hidden flex justify-center items-center">
                  <p>{user?.name?.charAt(0) || "U"}</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
