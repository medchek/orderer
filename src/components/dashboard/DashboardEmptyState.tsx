import { cn } from "@/lib/utils";
import React from "react";
import DashboardEmptyStateButton from "./DashboardEmptyStateButton";

interface Props {
  className?: string;
  Icon: React.ReactNode;
  text: string;
  subContent?: React.ReactNode | string;
  subContentAction?: () => void;
  /** Display a plus icon before the action button text */
  actionButtonIcon?: boolean;
}

export default function DashboardEmptyState({
  Icon,
  subContent,
  text,
  subContentAction,
  actionButtonIcon,
  className,
}: Props) {
  const subContentDisplay = () => {
    if (subContentAction !== undefined) {
      return (
        <DashboardEmptyStateButton
          onClick={subContentAction}
          text={subContent}
          plusIcon={actionButtonIcon}
        />
      );
    }

    if (subContent) {
      if (typeof subContent === "string") {
        return <p className="text-sm text-stone-400">{subContent}</p>;
      } else {
        return subContent;
      }
    }
  };
  return (
    <div
      className={cn(
        "flex h-full w-full -translate-y-12 items-center justify-center",
        className,
      )}
    >
      <div className="flex w-96 flex-col items-center gap-1 text-center  text-stone-100">
        {Icon}
        <p>{text}</p>

        {subContentDisplay()}
      </div>
    </div>
  );
}
