import React from "react";
import Loader from "./Loader";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  loaderClassName?: string;
}

export default function RouteLoader({ className, loaderClassName }: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-transparent",
        className,
      )}
    >
      <Loader className={cn("h-10 w-10", loaderClassName)} />
    </div>
  );
}
