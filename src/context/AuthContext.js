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
  const router = useRouter();
  const { data: session, status, update } = useSession();

  // Set up session refresh interval
  useEffect(() => {
    const refreshInterval = 10 * 60 * 1000; // 10 minutes

    const refreshSession = async () => {
      try {
        console.log("Refreshing session...");
        await update(); // Use the update method from useSession
      } catch (error) {
        console.error("Failed to refresh session:", error);
      }
    };

    const intervalId = setInterval(() => {
      if (session) refreshSession();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [session, update]);

  // Update the user state when the session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
    } else if (status === "unauthenticated") {
      setUser(null);
    }

    setLoading(false);
  }, [session, status]);

  const refreshUserSession = async () => {
    try {
      setLoading(true);
      const updatedSession = await update();
      if (updatedSession?.user) {
        setUser(updatedSession.user);
      }
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Session refresh failed:", error);
      setLoading(false);
      return false;
    }
  };

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
        refreshUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
