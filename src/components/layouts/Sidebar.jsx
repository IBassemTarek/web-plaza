"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        <li>
          {" "}
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-black hover:text-white rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-black hover:text-white rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
