import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function SwitchButton({ isActive, ...props }: Props) {
  return (
    <button
      type="button"
      className={`relative flex h-7 w-14 min-w-[3.5rem] items-center rounded-full transition-colors ${
        isActive ? "bg-secondary" : "bg-stone-700"
      }`}
      {...props}
    >
      <span
        className={`absolute inline-block h-6 w-6 rounded-full transition-all ${
          isActive ? "translate-x-3 bg-white" : "-translate-x-3 bg-stone-300"
        } `}
      ></span>
    </button>
  );
}
