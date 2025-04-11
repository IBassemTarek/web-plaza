"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

import { useSession } from "next-auth/react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);
  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
      });

      if (data?.user) {
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await axios.post(`/api/address`, address);

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const { data } = await axios.put(`/api/address/${id}`, address);

      if (data?.address) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(`/api/address/${id}`);

      if (data?.success) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        updated,
        setUpdated,
        setUser,
        registerUser,
        addNewAddress,
        updateAddress,
        deleteAddress,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
