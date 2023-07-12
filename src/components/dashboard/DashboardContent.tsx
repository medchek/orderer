"use client";
import { useStore } from "@/store";
import React, { Suspense } from "react";
const Snackbar = React.lazy(() => import("../Snackbar"));

interface Props {
  children: React.ReactNode;
}

export default function DashboardContent({ children }: Props) {
  const { isSnackShown } = useStore();
  return (
    <div
      id="dashboard-content"
      className="flex h-full grow flex-col bg-[#F3F3F3] py-2 pl-6 dark:bg-transparent"
    >
      {children}
      <Suspense>{isSnackShown && <Snackbar />}</Suspense>
    </div>
  );
}
