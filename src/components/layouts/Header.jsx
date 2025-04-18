"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { t } = useLocale();

  const cartItems = cart?.cartItems;

  // Use direct navigation instead of Link component
  const handleProfileClick = (e) => {
    e.preventDefault();
    if (session?.user) {
      router.push("/me");
    } else {
      router.push("/login");
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

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Link
              href="/chat"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-comments"></i>
              <span className="hidden lg:inline ml-1">{t("Chat")}</span>
            </Link>

            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                {t("Cart")} (<b>{cartItems?.length || 0}</b>)
              </span>
            </Link>

            {!session?.user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">{t("Sign in")}</span>
              </Link>
            ) : (
              <a
                href="#"
                onClick={handleProfileClick}
                className="cursor-pointer"
              >
                <div className="w-10 h-10 bg-black text-white rounded-full overflow-hidden flex justify-center items-center">
                  <p>{session.user.name?.charAt(0) || "U"}</p>
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
