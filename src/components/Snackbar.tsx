import { useStore } from "@/store";
import clsx from "clsx";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

export default function Snackbar() {
  const { snackText, snackType, hideSnackbar, snackTimeout } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideSnackbar();
    }, snackTimeout);
    return () => clearTimeout(timer);
  });

  return createPortal(
    <div
      id="snack"
      className={clsx(
        "absolute bottom-6 left-0 right-0 z-50 mx-auto flex min-h-[3.5rem] w-96 items-center justify-between gap-2 rounded-xl px-4 py-2 text-sm  shadow-lg ",
        {
          "text-red-50 dark:bg-red-700": snackType === "error",
          "bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100":
            snackType !== "error",
        },
      )}
    >
      <p>{snackText}</p>
      <button
        type="button"
        className={clsx(
          "h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-md transition-colors",
          {
            "dark:hover:bg-red-100/25 dark:focus:bg-white/[.15]":
              snackType === "error",
            "dark:hover:bg-stone-800 dark:focus:bg-stone-950":
              snackType !== "error",
          },
        )}
        onClick={hideSnackbar}
      >
        <MdClear className="h-6 w-6" />
      </button>
    </div>,
    document.body,
  );
}
