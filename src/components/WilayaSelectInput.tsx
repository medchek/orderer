import { randInputId } from "@/lib/utils";
import { MdChevronRight } from "react-icons/md";
import React from "react";

type Props = {
  label: string;
};

function SelectInput({ label }: Props) {
  const inputId = randInputId();
  return (
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={inputId} className="text-lg font-semibold">
        {label}
      </label>
      <div className="relative flex items-center h-12 w-full">
        <select
          id={inputId}
          className="w-full h-12 rounded-lg bg-[#ECECEC] placeholder-[#979797] px-4 appearance-none outline-secondary"
        >
          <option>Alger</option>
        </select>
        <MdChevronRight className="absolute right-4 rotate-90 w-8 h-8 pointer-events-none" />
      </div>
      <span className="w-full text-right">+400 DA</span>
    </div>
  );
}

export default SelectInput;
