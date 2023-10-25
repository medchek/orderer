import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  description: string;
  Icon: React.ReactNode;
  href: string;
}

export default function SettingsLink({
  label,
  description,
  Icon,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="flex h-16 items-center gap-2 rounded-lg bg-neutral-200 p-2 hover:bg-neutral-300 dark:bg-neutral-950 dark:hover:bg-neutral-900"
    >
      <div className="hidden h-10 w-10 items-center justify-center rounded-md dark:text-neutral-500 lg:flex">
        {Icon}
      </div>
      <section className="flex flex-col">
        <h2 className="text-sm font-semibold dark:text-neutral-200">{label}</h2>
        <p className="text-xs dark:text-neutral-500">{description}</p>
      </section>
    </Link>
  );
}
