"use client";

import dynamic from "next/dynamic";
import { useStore } from "@/store";
const Snackbar = dynamic(() => import("../Snackbar"));

export default function SnackProvider() {
  const { isSnackShown } = useStore();

  return isSnackShown && <Snackbar />;
}
