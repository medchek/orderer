import React from "react";

interface Props {
  label: string;
  text: string | number;
  subText?: string;
}

export default function DashboardHomeStatCol({ label, text, subText }: Props) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-lg bg-neutral-200 px-4 py-4 dark:bg-neutral-950">
      <p className="text-sm text-neutral-500">{label}</p>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {text}
        </p>
        {subText && subText.length > 0 && (
          <p className="text-xs font-semibold text-neutral-500">{subText}</p>
        )}
      </div>
    </div>
  );
}
