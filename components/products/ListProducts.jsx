"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../layouts/Filters";

import ProductItem from "./ProductItem";

const ListProducts = ({ data }) => {
  return (
    <section className="py-12">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3 flex flex-col">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.products?.map((product) => (
                <ProductItem key={product?._id} product={product} />
              ))}
            </div>

            <CustomPagination
              resPerPage={data?.resPerPage}
              productsCount={data?.filteredProductsCount}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
