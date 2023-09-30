// import AuthProvider from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardProductsDisplay from "@/features/products/components/dashboard/DashboardProductsDisplay";
import { DashboardProductsToolbar } from "@/features/products/components/dashboard/DashboardProductsToolbar";
import React from "react";

export default async function Products() {
  return (
    <div id="dashboard-products" className="flex grow flex-col pt-3 pl-6">
      <DashboardHeader label="Produits" />
      <DashboardProductsToolbar />
      <DashboardProductsDisplay />
    </div>
  );
}
