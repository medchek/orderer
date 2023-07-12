import { useStore } from "@/store";
import { SnackType } from "@/store/snackbarSlice";
import React from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

interface Props {}

export default function Snackbar({}: Props) {
  const { snackText, stanckType, hideSnackbar } = useStore();

  return createPortal(
    <div
      id="snack"
      className={`absolute bottom-6 left-0 right-0 z-50 mx-auto flex h-14 w-96 items-center justify-between rounded-xl px-4 shadow-lg  dark:text-white ${
        stanckType === "error" ? "dark:bg-red-700" : "bg-card-dark "
      }`}
    >
      <p>{snackText}</p>
      <button
        type="button"
        className="h-8 w-8 rounded-md transition-colors dark:hover:bg-white/10 dark:focus:bg-white/5"
        onClick={hideSnackbar}
      >
        <MdClear className="h-6 w-6" onClick={close} />
      </button>
    </div>,
    document.body
  );
}
