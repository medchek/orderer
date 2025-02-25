import { cn } from "@/lib/utils";
import React from "react";
import Loader from "./Loader";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  className,
  children,
  isLoading,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "h-10 w-36 rounded-md bg-blue-600 px-2 text-white outline-hidden transition-colors hover:bg-secondary active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-400 dark:disabled:bg-neutral-900 dark:disabled:text-zinc-700",
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader className="h-6 w-6" /> : children}
    </button>
  );
}
