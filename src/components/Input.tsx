import { randInputId } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

function Input({ label, placeholder, type }: Props) {
  const inputId = randInputId();
  return (
    <div className="flex flex-col w-full mb-1">
      <label htmlFor={inputId} className="text-lg font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        name=""
        id={inputId}
        placeholder={placeholder}
        className="h-12 rounded-lg bg-[#ECECEC] placeholder-[#979797] px-4 outline-secondary"
      />
      <div className="h-5 text-red-600 text-sm"></div>
    </div>
  );
}

export default Input;
