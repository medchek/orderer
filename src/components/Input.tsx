import { randInputId } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  registerRules?: RegisterOptions;
  error?: string;
}

function Input({
  label,
  id,
  name,
  register,
  registerRules,
  error,
  ...props
}: Props) {
  return (
    <div className="mb-1 flex w-full flex-col">
      <label
        htmlFor={id}
        className="mb-1 text-lg font-semibold dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        {...(register && register(name, registerRules))}
        className="h-12 rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-white"
      />
      <div className="h-5 text-sm text-red-600">{error && error}</div>
    </div>
  );
}

export default Input;
