"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

// This component can be added to the top of protected pages
export default function ProtectRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [user, loading, router]);

  // Show nothing while checking authentication
  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
}
