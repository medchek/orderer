import React from "react";
import AccountActions from "../AccountActions";

interface Props {
  label: string;
}

export default function DashboardHeader({ label }: Props) {
  return (
    <div
      id="dashboard-title"
      className="flex h-14 min-h-[3.5rem] w-full justify-between pr-6"
    >
      <h1 className="text-xl font-bold dark:text-white">{label}</h1>
      <AccountActions />
    </div>
  );
}
