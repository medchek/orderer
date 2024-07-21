import { cn } from "@/lib/utils";
import React from "react";
import { MdSearch } from "react-icons/md";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function DashboardSearchInput({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-64 min-w-[16rem] items-center",
        className,
      )}
    >
      <MdSearch className="pointer-events-none absolute left-2 h-6 w-6 text-stone-400" />
      <input
        type="search"
        className="h-full w-full rounded-lg bg-neutral-200 pl-10 pr-2 text-sm placeholder-neutral-400 outline-none ring-secondary focus:ring-2 dark:bg-neutral-900 dark:text-white dark:[color-scheme:dark]"
        {...props}
      />
    </div>
  );
}
