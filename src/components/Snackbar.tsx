import { useStore } from "@/store";
import { SnackType } from "@/store/snackbarSlice";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

interface Props {}

export default function Snackbar({}: Props) {
  const {
    snackText,
    snackType: stanckType,
    hideSnackbar,
    snackTimeout,
  } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideSnackbar();
    }, snackTimeout);
    return () => clearTimeout(timer);
  });

  return createPortal(
    <div
      id="snack"
      className={`absolute bottom-6 left-0 right-0 z-50 mx-auto flex h-14 w-96 items-center justify-between rounded-xl px-4 text-sm  shadow-lg dark:text-card-dark ${
        stanckType === "error" ? "dark:bg-red-700" : "bg-[#f6f7fd]"
      }`}
    >
      <p>{snackText}</p>
      <button
        type="button"
        className={`h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-md transition-colors ${
          stanckType === "error"
            ? "dark:hover:bg-white/25 dark:focus:bg-white/[.15]"
            : "dark:hover:bg-white/10 dark:focus:bg-white/5"
        }`}
        onClick={hideSnackbar}
      >
        <MdClear className="h-6 w-6" onClick={close} />
      </button>
    </div>,
    document.body
  );
}
