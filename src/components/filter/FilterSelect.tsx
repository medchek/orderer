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
          "h-8 w-48 appearance-none rounded-md px-2 outline-none ring-secondary focus:ring-2 dark:bg-neutral-800 dark:text-neutral-300 dark:[color-scheme:dark]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {!isLoading ? (
        <MdChevronRight className="pointer-events-none absolute right-1 h-5 w-5 rotate-90" />
      ) : (
        <Loader className="absolute right-1 h-4 w-4 border-neutral-500" />
      )}
    </div>
  );
}
