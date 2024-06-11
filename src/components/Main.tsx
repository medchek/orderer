import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

/** &lt;main&gt; tag wrapper that provides consistent padding. Intended to wrap page.tsx */
export default async function Main({ children, className }: Props) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen flex-col px-4 text-neutral-950 dark:text-neutral-50 xl:px-10 2xl:px-56 ",
        className,
      )}
    >
      {children}
    </main>
  );
}
