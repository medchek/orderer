"use client";
import React, { useEffect, useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal, ...props }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.code === "Escape") closeModal();
    };
    document.addEventListener("click", handleClickOutside, {
      capture: true,
    });
    document.addEventListener("keydown", handleEscPress, { capture: true });
    // clean up
    return () => {
      document.body.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
      document.removeEventListener("keydown", handleEscPress, {
        capture: true,
      });
    };
  }, []);

  return (
    <div
      id="dialog"
      className="absolute z-10 w-screen h-screen bg-gray-950 dark:bg-stone-950 bg-opacity-50 dark:bg-opacity-70 top-0 left-0 px-10 2xl:px-72 py-10"
    >
      <div {...props} ref={ref}>
        {children}
      </div>
    </div>
  );
}
