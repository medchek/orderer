import React from "react";
import { IconType } from "react-icons";
import { MdAdd } from "react-icons/md";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  /** Display the icon before the button text, if it's empty display the plus sign. `noIcon` prop should be used to completely remove icon display */
  Icon?: IconType;
  /** Remove the icon before the text as by default, the component always displays a plus sign before the button text or the provided `Icon`. */
  noIcon?: boolean;
}

export default function DashboardEmptyStateButton({
  text,
  Icon,
  noIcon,
  ...props
}: Props) {
  const ButtonIcon = () => {
    if (noIcon) return null;

    return Icon !== undefined ? <Icon /> : <MdAdd className="size-7" />;
  };
  return (
    <button
      className="h-10 rounded-lg px-2 font-semibold transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900/70"
      {...props}
    >
      {ButtonIcon()} {text}
    </button>
  );
}
