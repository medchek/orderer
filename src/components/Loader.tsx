import { cn } from "@/lib/utils";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
/**
 * A spinning loader. By default it has a hight and width of 24px and a stone-400 tw color.
 *
 */
export default function Loader({ className }: Props) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-neutral-400 border-b-transparent dark:border-b-transparent",
        className,
      )}
    ></div>
  );
}
