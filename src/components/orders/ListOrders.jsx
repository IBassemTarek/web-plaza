"use client";

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CartContext from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectRoute from "../auth/ProtectRoute";
import { useLocale } from "@/context/LocaleContext";

const ListOrders = ({ orders }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();
  const { t } = useLocale();

  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, []);

  return (
    <ProtectRoute>
      <h3 className="text-xl font-semibold mb-5">{t("Your Orders")}</h3>
      {orders?.map((order, i) => (
        <OrderItem key={i} order={order} />
      ))}
    </ProtectRoute>
  );
};

export default ListOrders;
