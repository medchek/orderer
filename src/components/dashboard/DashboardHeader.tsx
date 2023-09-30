import React from "react";
import AccountActions from "../AccountActions";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  noPadding?: boolean;
  className?: string;
  description?: string;
}

export default function DashboardHeader({
  label,
  noPadding,
  description,
  className,
}: Props) {
  return (
    <div
      id="dashboard-title"
      className={cn(
        "flex h-14 min-h-[3.5rem] w-full justify-between",
        { "pr-6": !noPadding },
        className,
      )}
    >
      <section>
        <h1 className="text-xl font-semibold dark:text-white">{label}</h1>
        {description?.trim().length !== 0 && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </section>
      <AccountActions />
    </div>
  );
}
