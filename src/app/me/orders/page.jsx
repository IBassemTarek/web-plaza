"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ListOrders from "@/components/orders/ListOrders";
import axios from "axios";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Fetch orders client-side
  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "authenticated") {
        try {
          const { data } = await axios.get("/api/orders/me");
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (status !== "loading") {
      fetchOrders();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect in the useEffect
  }

  return <ListOrders orders={orders} />;
}
