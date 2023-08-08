import { randInputId } from "@/lib/utils";
import React, { InputHTMLAttributes, forwardRef } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  registerRules?: RegisterOptions;
  error?: string;
  id?: string;
}

export default function Input({
  label,
  id,
  name,
  register,
  registerRules,
  error,
  ...props
}: Props) {
  const inputId = id ? id : `${name}-inputs`;
  return (
    <div className="mb-1 flex w-full flex-col">
      <label
        htmlFor={inputId}
        className="mb-1 2xl:text-lg font-semibold dark:text-stone-100"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        {...(register && register(name, registerRules))}
        className="h-12 rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed disabled:text-stone-400 dark:bg-neutral-900 dark:text-white dark:[color-scheme:dark] text-sm 2xl:text-base"
      />
      <div className="h-5 text-sm text-red-600 dark:text-red-500">
        {error && error}
      </div>
    </div>
  );
}
