"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";

import React from "react";
import { MdAdd } from "react-icons/md";

type Props = {};

export default function Blacklist({}: Props) {
  return (
    <div
      id="Liste Noire"
      className="flex w-full grow flex-col overflow-y-hidden px-6 py-3"
    >
      <DashboardHeader label="Categories" noPadding />
      <div
        id="categories-toolbar"
        className="flex h-16 min-h-[4rem] w-full items-center justify-between "
      >
        <button
          type="button"
          className="px-2 h-10 bg-blue-600 rounded-lg text-stone-50 font-semibold hover:bg-secondary focus:bg-blue-700 transition-colors"
          onClick={() => {}}
        >
          <MdAdd className="w-7 h-7" /> Ajouter un numero
        </button>
        <DashboardSearchInput placeholder="Cherche une catégorie" />
      </div>

      <section className="relative flex flex-col w-full grow text-stone-50 gap-4"></section>
    </div>
  );
}
