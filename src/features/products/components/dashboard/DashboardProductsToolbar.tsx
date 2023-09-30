"use client";

import { useStore } from "@/store";
import DashboardProductsFilter from "./DashboardProductsFilter";
import DashboardToolbarAddButton from "@/components/dashboard/DashboardToolbarAddButton";

export const DashboardProductsToolbar = () => {
  const { setIsAddProductOpen } = useStore();

  return (
    <div
      id="dashboard-products-toolbar"
      className="flex h-16 min-h-[4rem] items-center justify-between pr-6"
    >
      {/* old btn colors dark:bg-card-dark dark:hover:bg-[#242436] dark:focus:bg-[#0c0c13] */}
      <DashboardToolbarAddButton
        onClick={() => setIsAddProductOpen(true)}
        text="Ajouter un Produit"
      />

      {/* <DashboardSearchInput placeholder="Chercher un produit" /> */}
      <DashboardProductsFilter />
    </div>
  );
};
