import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  Icon: React.ReactNode;
  text: string;
  subText: string;
}

export default function DashboardEmptyState({
  Icon,
  subText,
  text,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "w-full h-full -translate-y-12 flex items-center justify-center",
        className
      )}
    >
      <div className="w-96 text-center flex flex-col items-center gap-1  text-stone-100">
        {Icon}
        <p>{text}</p>
        <p className="text-stone-400 text-sm">{subText}</p>
      </div>
    </div>
  );
}
