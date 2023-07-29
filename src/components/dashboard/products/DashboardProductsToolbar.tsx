"use client";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import dynamic from "next/dynamic";
import ModalLoader from "../../ModalLoader";
import DashboardSearchInput from "../DashboardSearchInput";
import { useStore } from "@/store";

const DashboardAddProduct = dynamic(() => import("./DashboardAddProduct"), {
  loading: () => <ModalLoader />,
});

export const DashboardProductsToolbar = () => {
  const { isAddProductOpen, setIsAddProductOpen } = useStore();

  return (
    <div
      id="dashboard-tools"
      className="flex h-16 min-h-[4rem] items-center justify-between pr-6"
    >
      {/* old btn colors dark:bg-card-dark dark:hover:bg-[#242436] dark:focus:bg-[#0c0c13] */}
      <button
        type="button"
        className="flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 font-semibold text-white transition-colors dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700"
        onClick={() => setIsAddProductOpen(true)}
      >
        <MdAdd className="h-6 w-6" /> Ajouter un Produit
      </button>

      <DashboardSearchInput placeholder="Chercher un produit" />
      {isAddProductOpen && (
        <DashboardAddProduct closeModal={() => setIsAddProductOpen(false)} />
      )}
    </div>
  );
};
