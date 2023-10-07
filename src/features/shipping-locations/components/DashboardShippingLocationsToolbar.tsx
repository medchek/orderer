"use client"
import DashboardToolbarAddButton from "@/components/dashboard/DashboardToolbarAddButton";
import { useStore } from "@/store";
import React from "react";
import DashboardShippingLocationFilter from "./DashboardShippingLocationFilter";

export default function DashboardShippingLocationsToolbar() {
  const { setIsShippingLocationModalOpen } = useStore();
  return (
    <div
      id="dashboard-shipping-locations-toolbar"
      className="flex h-16 min-h-[4rem] items-center justify-between pr-6"
    >
      {/* old btn colors dark:bg-card-dark dark:hover:bg-[#242436] dark:focus:bg-[#0c0c13] */}
      <DashboardToolbarAddButton
        text="Ajouter un point"
        onClick={() => setIsShippingLocationModalOpen(true)}
      />

      <DashboardShippingLocationFilter />
    </div>
  );
}
