import React from "react";

type Props = {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
};

export default function TypeSelectorButton({
  text,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      className="flex h-full w-full flex-1 items-center justify-start gap-2 rounded-lg bg-[#E9E9E9] px-2 text-sm font-semibold focus:ring-2 focus:ring-secondary dark:bg-neutral-900 dark:text-white 2xl:gap-4 2xl:px-4 2xl:text-base"
      onClick={onClick}
      type="button"
    >
      <div
        className={`flex h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] items-center justify-center rounded-full border-2 border-black 2xl:h-6 2xl:w-6 ${
          isSelected ? "dark:border-secondary" : "dark:border-white"
        }`}
      >
        {isSelected && (
          <span className="h-3 w-3 rounded-full bg-black dark:bg-secondary"></span>
        )}
      </div>
      <p>{text}</p>
    </button>
  );
}
