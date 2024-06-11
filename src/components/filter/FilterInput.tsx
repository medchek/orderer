import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function FilterInput({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "h-8 w-40 appearance-none rounded-md bg-neutral-200 px-2 text-sm text-neutral-900 outline-none ring-secondary focus:ring-2 dark:bg-neutral-800 dark:text-neutral-300 dark:[color-scheme:dark] lg:w-48",
        className,
      )}
      {...props}
    />
  );
}
