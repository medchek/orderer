import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  column?: boolean;
  children: React.ReactNode;
}

export default function FilterLabel({
  label,
  children,
  column,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn("flex", {
        "flex-row items-center justify-between gap-6 lg:gap-0": !column,
        "flex-col items-start gap-2": column,
      })}
    >
      <label {...props}>{label}</label>
      <div
        className={cn(
          "relative flex items-center",
          {
            "w-full": column,
          },
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
