"use client";
import { useStore } from "@/store";
import { useEffect } from "react";

/**
 * A client component solely intended to be used inside a server component
 * that will reset the order products.
 */
export default function ResetOrderProducts() {
  const { removeAllSelectedProducts } = useStore();
  useEffect(() => {
    console.log("useResetOrderProducts() => resetting the order");
    removeAllSelectedProducts();
  }, [removeAllSelectedProducts]);
  return null;
}
