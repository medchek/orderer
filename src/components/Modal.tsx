"use client";
import React, { Suspense, useEffect, useRef } from "react";
import Loader from "./Loader";

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
      className="absolute left-0 top-0 z-10 h-screen w-screen bg-gray-950 bg-opacity-50 px-10 py-10 dark:bg-stone-950 dark:bg-opacity-70 2xl:px-72"
    >
      <Suspense fallback={<Loader />}>
        <div {...props} ref={ref}>
          {children}
        </div>
      </Suspense>
    </div>
  );
}
