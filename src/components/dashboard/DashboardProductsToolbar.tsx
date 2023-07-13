"use client";
import React, { Fragment, useState } from "react";
import { MdAdd } from "react-icons/md";
import AccountActions from "../AccountActions";
import dynamic from "next/dynamic";
import ModalLoader from "../ModalLoader";

const DashboardAddProduct = dynamic(() => import("./DashboardAddProduct"), {
  loading: () => <ModalLoader />,
});

export const DashboardProductsToolbar = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <Fragment>
      <div
        id="dashboard-title"
        className="flex h-14 min-h-[3.5rem] w-full justify-between"
      >
        <h1 className="text-2xl font-bold dark:text-white">Products</h1>
        <AccountActions />
      </div>
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
    </Fragment>
  );
};
