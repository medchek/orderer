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
 * If the className prop is present, the default width, hight and border colors are removed and need to be supplied.
 */
export default function Loader({ className }: Props) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-r-transparent dark:border-r-transparent h-6 w-6 border-stone-400",
        className
      )}
    ></div>
  );
}
