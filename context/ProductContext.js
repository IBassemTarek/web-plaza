"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product, token) => {
    console.log(token);
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/admin/products`,
        product,
        {
          headers: {
            Cookie: `next-auth.session-token=${token}`,
          },
        }
      );

      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      console.log(error);
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
        loading,
        updated,
        setUpdated,
        newProduct,

        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
