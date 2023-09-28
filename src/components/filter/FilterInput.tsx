import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function FilterInput({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "h-8 w-48 appearance-none rounded-md bg-neutral-800 px-2 text-sm text-neutral-300 outline-none ring-secondary placeholder:text-neutral-500 focus:ring-2 dark:[color-scheme:dark]",
        className,
      )}
      {...props}
    />
  );
}
