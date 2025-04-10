"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import Router from "next/router";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
        product
      );

      if (data) {
        setLoading(false);

        router.replace("/admin/products");
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productId}`
      );
      setLoading(false);
      Router.reload();
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${id}`,
        product
      );

      if (data?.product) {
        setLoading(false);
        setUpdated(true);
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        updated,
        setUpdated,
        clearErrors,
        loading,
        newProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
