import { cn } from "@/lib/utils";
import React from "react";
import DashboardEmptyStateButton from "./DashboardEmptyStateButton";

interface Props {
  className?: string;
  contentClassName?: string;
  Icon: React.ReactNode;
  text: string;
  subContent?: React.ReactNode | string;
  /** adds an action button that triggers the `subContentAction` function on click */
  subContentAction?: () => void;
  /** Display a plus icon before the action button text */
  actionButtonIcon?: boolean;
  /** By default, the component has a -y-translate-12 class. This prop can be use to disable it by default */
  noTranslate?: boolean;
}

export default function DashboardEmptyState({
  Icon,
  subContent,
  text,
  subContentAction,
  actionButtonIcon,
  noTranslate,
  className,
  contentClassName,
}: Props) {
  const subContentDisplay = () => {
    if (subContentAction !== undefined) {
      return (
        <DashboardEmptyStateButton
          onClick={subContentAction}
          text={subContent}
          noIcon={!actionButtonIcon}
        />
      );
    }

    if (subContent) {
      if (typeof subContent === "string") {
        return <p className="text-sm text-neutral-400">{subContent}</p>;
      } else {
        return subContent;
      }
    }
  };
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        {
          "-translate-x-12": !noTranslate,
        },
        className,
      )}
    >
      <div
        className={cn(
          "flex w-96 flex-col items-center gap-1 text-center text-neutral-900 dark:text-neutral-100",
          contentClassName,
        )}
      >
        {Icon}
        <p>{text}</p>

        {subContentDisplay()}
      </div>
    </div>
  );
}
