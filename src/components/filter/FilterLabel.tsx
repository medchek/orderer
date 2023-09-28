import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  children: React.ReactNode;
}

export default function FilterLabel({
  label,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <label {...props}>{label}</label>
      <div className={cn("relative flex items-center", className)}>
        {children}
      </div>
    </div>
  );
}
