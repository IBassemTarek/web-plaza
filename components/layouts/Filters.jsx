"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getPriceQueryParams } from "@/helpers/helpers";

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const router = useRouter();

  let queryParams;

  function handleClick(checkbox) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      // Delete the filter from query
      queryParams.delete(checkbox.name);
    } else {
      // Set filter in the query
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  }

  function handleButtonClick() {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      queryParams = getPriceQueryParams(queryParams, "min", min);
      queryParams = getPriceQueryParams(queryParams, "max", max);

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <button
        className="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filter by
      </button>
      <div
        className={`${
          showFilters ? "" : "hidden"
        } md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm transition-all`}
      >
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <div className="grid md:grid-cols-2 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 w-full">
          <button
            className="px-1 py-2 text-center w-full inline-block text-white bg-black border border-transparent rounded-md"
            onClick={handleButtonClick}
          >
            Go
          </button>
        </div>
      </div>

      <div
        className={`${
          showFilters ? "" : "hidden"
        } my-5 md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm transition-all`}
      >
        <h3 className="font-semibold mb-2">Category</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Electronics"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Electronics")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Electronics </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Gaming"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Gaming")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Gaming </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Fashion"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Fashion")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Fashion </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Grocery"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Grocery")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Grocery </span>
            </label>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
