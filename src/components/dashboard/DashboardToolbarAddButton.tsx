import React from "react";
import { MdAdd } from "react-icons/md";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function DashboardToolbarAddButton({ text, ...props }: Props) {
  return (
    <button
      type="button"
      className="h-10 rounded-lg bg-blue-600 px-2 text-sm font-semibold text-stone-50 transition-colors hover:bg-secondary focus:bg-blue-700"
      {...props}
    >
      <MdAdd className="h-7 w-7" /> {text}
    </button>
  );
}
