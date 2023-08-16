import React from "react";
import AccountActions from "../AccountActions";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  noPadding?: boolean;
  className?: string;
}

export default function DashboardHeader({
  label,
  noPadding,
  className,
}: Props) {
  return (
    <div
      id="dashboard-title"
      className={cn(
        "flex h-14 min-h-[3.5rem] w-full justify-between",
        { "pr-6": !noPadding },
        className
      )}
    >
      <h1 className="text-xl font-bold dark:text-white">{label}</h1>
      <AccountActions />
    </div>
  );
}
