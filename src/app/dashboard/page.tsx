// import AuthProvider from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardProductDisplay from "@/components/dashboard/products/DashboardProductsDisplay";
import { DashboardProductsToolbar } from "@/components/dashboard/products/DashboardProductsToolbar";
import React from "react";

type Props = {};

export default async function Dashboard({}: Props) {
  return (
    <div id="dashboard-products" className="flex grow flex-col py-3 pl-6">
      <DashboardHeader label="Produits" />
      <DashboardProductsToolbar />
      <DashboardProductDisplay />
    </div>
  );
}
