import React from "react";
import { MdChevronRight } from "react-icons/md";
import Loader from "../Loader";
import { cn } from "@/lib/utils";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function FilterSelect({
  isLoading,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className="relative flex items-center">
      <select
        disabled={isLoading}
        className={cn(
          "h-8 w-40 appearance-none rounded-md bg-neutral-200 px-2 text-neutral-900 outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-300 dark:[color-scheme:dark] lg:w-48",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {!isLoading ? (
        <MdChevronRight className="pointer-events-none absolute right-1 h-5 w-5 rotate-90 text-neutral-600" />
      ) : (
        <Loader className="absolute right-1 h-4 w-4 border-neutral-500" />
      )}
    </div>
  );
}
