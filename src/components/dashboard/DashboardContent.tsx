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
    <React.Fragment>
      {children}
      <Suspense>{isSnackShown && <Snackbar />}</Suspense>
    </React.Fragment>
  );
}
