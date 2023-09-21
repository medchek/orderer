import Loader from "@/components/Loader";
import React from "react";
import { MdChevronRight } from "react-icons/md";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function DashboardOrdersFilterInput({
  label,
  ...props
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor={`${label}-select`}>{label}</label>
      <div className="relative flex items-center">
        <input
          id={`${label}-select`}
          className="h-8 w-48 rounded-md px-2 bg-neutral-800 text-neutral-300 appearance-none dark:[color-scheme:dark] outline-none focus:ring-2 ring-secondary text-sm placeholder:text-neutral-500"
          {...props}
        />
      </div>
    </div>
  );
}
