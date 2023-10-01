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
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
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
      id="dialog"
      className={`absolute left-0 top-0 z-10 h-screen w-screen bg-gray-950 bg-opacity-50 px-10 py-10 dark:bg-stone-950 dark:bg-opacity-80 2xl:px-72 ${
        centerModalContent && "flex items-center justify-center"
      }`}
    >
      <div
        className={cn(
          "flex flex-col dark:[color-scheme:dark]",
          {
            "rounded-lg  bg-[#F3F3F3] px-8 py-5 shadow-md dark:bg-[#040404]":
              !transparent,
          },
          className,
        )}
        {...props}
        ref={ref}
      >
        {!hideHeader && (
          <div id="dialog-header" className="flex grow-0 justify-between px-2">
            <h1 className="text-xl font-semibold dark:text-neutral-100">
              {label}
            </h1>
            <button
              onClick={closeModal}
              className="flex h-7 w-7 items-center  justify-center rounded-md focus:bg-[#d4d4d4] disabled:cursor-not-allowed dark:focus:bg-neutral-950"
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
