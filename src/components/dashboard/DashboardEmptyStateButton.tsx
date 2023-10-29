import React from "react";
import { MdAdd } from "react-icons/md";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  /** Display a plus icon before the button text */
  plusIcon?: boolean;
}

export default function DashboardEmptyStateButton({
  text,
  plusIcon,
  ...props
}: Props) {
  return (
    <button
      className="h-10 rounded-lg  px-2 font-semibold transition-colors dark:hover:bg-neutral-900 dark:focus:bg-neutral-900/70"
      {...props}
    >
      {plusIcon && <MdAdd className="h-7 w-7" />} {text}
    </button>
  );
}
