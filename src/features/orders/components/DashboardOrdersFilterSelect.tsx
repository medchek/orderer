import Loader from "@/components/Loader";
import React from "react";
import { MdChevronRight } from "react-icons/md";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function DashboardOrdersFilterSelect({
  label,
  children,
  isLoading,
  ...props
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor={`${label}-select`}>{label}</label>
      <div className="relative flex items-center">
        <select
          id={`${label}-select`}
          disabled={isLoading}
          className="h-8 w-48 rounded-md px-2 bg-neutral-800 text-neutral-300 appearance-none dark:[color-scheme:dark] outline-none focus:ring-2 ring-secondary"
          {...props}
        >
          {children}
        </select>
        {!isLoading ? (
          <MdChevronRight className="absolute w-5 h-5 right-1 rotate-90 pointer-events-none" />
        ) : (
          <Loader className="absolute right-1 border-neutral-500 w-4 h-4" />
        )}
      </div>
    </div>
  );
}
