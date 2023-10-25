import clsx from "clsx";
import React from "react";
import {
  MdBrightness7,
  MdOutlineBrightness4,
  MdOutlineBrightness6,
} from "react-icons/md";
import { ThemeType } from "../types";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  inputValue: ThemeType;
  isSelected?: boolean;
}

export default function ThemeSelectorButton({
  inputValue,
  onChange,
  isSelected,
}: Props) {
  const content = () => {
    if (inputValue === "sys") {
      return (
        <>
          <MdOutlineBrightness6 className="h-6 w-6 text-neutral-900" />
          <span className="text-neutral-100 mix-blend-difference">Système</span>
        </>
      );
    }
    if (inputValue === "light") {
      return (
        <>
          <MdBrightness7 className="h-6 w-6" />
          <span>Claire</span>
        </>
      );
    }
    if (inputValue === "dark") {
      return (
        <>
          <MdOutlineBrightness4 className="h-6 w-6" />
          <span className="">Sombre</span>
        </>
      );
    }
  };

  return (
    <div className="flex items-center gap-4 dark:[color-scheme:dark]">
      <input
        type="radio"
        className="h-5 w-5"
        value={inputValue}
        name="theme"
        id={`${inputValue}-radio`}
        checked={isSelected}
        onChange={onChange}
      />
      <label
        className={clsx(
          "flex h-12 cursor-pointer items-center gap-1  rounded-md px-14 font-semibold",
          {
            "bg-neutral-200 text-neutral-900": inputValue === "light",
            "bg-neutral-900 text-neutral-200": inputValue === "dark",
            "bg-gradient-to-r from-neutral-200 from-50% to-neutral-900 to-50%":
              inputValue === "sys",
          },
        )}
        htmlFor={`${inputValue}-radio`}
      >
        {content()}
      </label>
    </div>
  );
}
