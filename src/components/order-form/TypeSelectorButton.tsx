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
      className="flex items-center space-x-4 flex-1 h-full bg-[#E9E9E9] w-full rounded-lg text-base font-semibold focus:ring-2 focus:ring-secondary px-4"
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center justify-center w-6 h-6 border-2 border-black rounded-full">
        {isSelected && <span className="w-3 h-3 bg-black rounded-full"></span>}
      </div>
      <p>{text}</p>
    </button>
  );
}
