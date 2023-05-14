"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      router.push(`/?keyword=${keyword}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-2 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={submitHandler}
    >
      <input
        className="flex-grow border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block border border-transparent bg-black text-white rounded-md"
        onClick={submitHandler}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
