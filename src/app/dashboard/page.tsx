"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardProductDisplay from "@/components/dashboard/DashboardProductsDisplay";
import { DashboardProductsToolbar } from "@/components/dashboard/DashboardProductsToolbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <main id="dashboard" className="flex h-screen w-screen">
      <DashboardNav />
      <div
        id="dashboard-content"
        className="flex h-full grow flex-col bg-[#F3F3F3] py-2 pl-6 dark:bg-transparent"
      >
        <div id="dashboard-title" className="h-14 min-h-[3.5rem]">
          <h1 className="text-2xl font-bold dark:text-white">Products</h1>
        </div>

        {/* TOOLS */}
        <DashboardProductsToolbar />

        <DashboardProductDisplay />
      </div>
    </main>
  );
}
