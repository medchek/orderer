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
      className="flex h-full w-full flex-1 items-center space-x-4 rounded-lg bg-[#E9E9E9] px-4 text-base font-semibold focus:ring-2 focus:ring-secondary dark:bg-[#17181D] dark:text-white"
      onClick={onClick}
      type="button"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-black ${
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
