import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  Icon: React.ReactNode;
  text: string;
  subContent?: React.ReactNode | string;
}

export default function DashboardEmptyState({
  Icon,
  subContent,
  text,
  className,
}: Props) {
  const subContentDisplay = () => {
    if (subContent) {
      if (typeof subContent === "string") {
        return <p className="text-stone-400 text-sm">{subContent}</p>;
      } else {
        return subContent;
      }
    }
  };
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

        {subContentDisplay()}
      </div>
    </div>
  );
}
