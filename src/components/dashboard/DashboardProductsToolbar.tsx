import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import DashboardAddProduct from "./DashboardAddProduct";

export const DashboardProductsToolbar = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <div id="dashboard-tools" className="h-14 min-h-[3.5rem]">
      <button
        type="button"
        className="flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 font-semibold text-white transition-colors dark:bg-card-dark dark:hover:bg-[#242436] dark:focus:bg-[#0c0c13]"
        onClick={() => setIsAddProductOpen(true)}
      >
        <MdAdd className="h-6 w-6" /> Ajouter un Produit
      </button>
      {isAddProductOpen && (
        <DashboardAddProduct closeModal={() => setIsAddProductOpen(false)} />
      )}
    </div>
  );
};