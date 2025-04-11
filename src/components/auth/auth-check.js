// lib/auth-check.js
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuthDebug() {
  const { data: session, status } = useSession();
  const [cookieInfo, setCookieInfo] = useState({});
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Parse cookies
    const cookieObj = {};
    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookieObj[name] = value;
    });

    setCookieInfo({
      hasSessionCookie:
        !!cookieObj["next-auth.session-token"] ||
        !!cookieObj["__Secure-next-auth.session-token"],
      sessionCookieName: cookieObj["next-auth.session-token"]
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token",
      cookieCount: Object.keys(cookieObj).length,
    });

    // Gather debugging info
    setDebugInfo({
      sessionStatus: status,
      hasSession: !!session,
      hasUser: !!session?.user,
      userID: session?.user?.id || session?.user?._id || "none",
      timestamp: new Date().toISOString(),
      host: window.location.host,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
    });

    // Log for debugging
    console.log("AUTH DEBUG:", { session, status, cookieInfo: cookieObj });
  }, [session, status]);

  return {
    session,
    status,
    cookieInfo,
    debugInfo,
    isAuthenticated: status === "authenticated" && !!session?.user,
  };
}

// You can add this component to any page for debugging
export function AuthDebugger() {
  const { debugInfo, cookieInfo, isAuthenticated } = useAuthDebug();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: isAuthenticated ? "#d1fae5" : "#fee2e2",
        padding: "8px",
        borderRadius: "4px",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "300px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <strong>Auth:</strong> {isAuthenticated ? "✅" : "❌"}
      </div>
      <div>
        <strong>Status:</strong> {debugInfo.sessionStatus}
      </div>
      <div>
        <strong>Session Cookie:</strong>{" "}
        {cookieInfo.hasSessionCookie ? "✅" : "❌"}
      </div>
      <div>
        <strong>User ID:</strong> {debugInfo.userID}
      </div>
      <div>
        <strong>Path:</strong> {debugInfo.pathname}
      </div>
      <button
        onClick={() =>
          console.log("Full debug info:", { debugInfo, cookieInfo })
        }
        style={{
          marginTop: "5px",
          padding: "2px 5px",
          backgroundColor: "#f3f4f6",
          border: "1px solid #d1d5db",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        Log Details
      </button>
    </div>
  );
}
