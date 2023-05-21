"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import instance from "@/lib/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);
  const { data, update } = useSession();

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);
  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const data = await instance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (data?.user || data) {
        setUpdated(true);
        router.replace(`/login`);
      }
      return data;
    } catch (error) {
      setError(error?.response?.data?.message);
      return null;
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const data = await instance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/update`,
        formData
      );
      if (data.status === 200) {
        setLoading(false);
        update({
          user: {
            name: formData.name,
            email: formData.email,
          },
        });
        update();
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const { data } = await instance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/update_password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data?.success) {
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await instance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
        address
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const { data } = await instance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
        address
      );

      if (data) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const data = await instance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`
      );

      if (data) {
        router.replace(`/me`);
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
        updateProfile,
        updatePassword,
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
