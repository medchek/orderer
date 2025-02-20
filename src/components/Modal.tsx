"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: React.ReactNode;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
  centerModalContent?: boolean;
  hideHeader?: boolean;
  preventClose?: boolean;
  transparent?: boolean;

  overlayClassName?: string;
}

export default function Modal({
  children,
  closeModal: closeModalPropFn,
  label,
  closeOnClickOutside,
  centerModalContent,
  hideHeader,
  preventClose,
  transparent,
  className,
  overlayClassName,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    if (!preventClose) closeModalPropFn();
  };

  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.code === "Escape") closeModal();
    };
    const handleClickOutside = (e: MouseEvent) => {
      // element to exclude from the clickoutside events
      const excludeOverlay = document.querySelector("div[data-vaul-overlay]");
      const excludeDrawer = document.querySelector("div[data-vaul-drawer]");
      const appVisualizer = document.querySelector(
        "#app-global-image-visualizer",
      );
      const closeSnackButton = document.querySelector("#snack");

      if (
        ref.current !== null &&
        !ref.current.contains(e.target as Node) &&
        // prevent closing when navigating the filter drawer
        !excludeOverlay?.contains(e.target as Node) &&
        !excludeDrawer?.contains(e.target as Node) &&
        !appVisualizer?.contains(e.target as Node) &&
        !closeSnackButton?.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    if (closeOnClickOutside) {
      document.addEventListener("click", handleClickOutside, {
        capture: true,
      });
    }
    document.addEventListener("keydown", handleEscPress, { capture: true });
    // clean up
    return () => {
      if (closeOnClickOutside) {
        document.body.removeEventListener("click", handleClickOutside, {
          capture: true,
        });
      }
      document.removeEventListener("keydown", handleEscPress, {
        capture: true,
      });
    };
  }, []);

  return createPortal(
    <div
      id="app-dialog"
      className={cn(
        "fixed top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-gray-950/50 px-2 py-10 lg:px-6 2xl:px-60 dark:bg-stone-950/80",
        centerModalContent ? "flex items-center justify-center" : "",
        overlayClassName,
      )}
    >
      <div
        className={cn(
          "flex flex-col dark:[color-scheme:dark]",
          {
            "rounded-lg bg-neutral-200 px-2 py-2 shadow-md lg:px-4 lg:py-5 dark:bg-[#040404]":
              !transparent,
          },
          className,
        )}
        {...props}
        ref={ref}
      >
        {!hideHeader && (
          <div
            id="dialog-header"
            className="flex grow-0 items-center justify-between lg:px-2"
          >
            <h1 className="text-lg font-semibold text-neutral-900 lg:text-xl dark:text-neutral-100">
              {label}
            </h1>
            <button
              onClick={closeModal}
              className="flex size-7 items-center justify-center rounded-md text-neutral-600 active:bg-neutral-300 disabled:cursor-not-allowed dark:active:bg-neutral-950"
              disabled={preventClose}
            >
              <MdClear className="h-6 w-6 dark:text-neutral-500" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}
