import { randInputId } from "@/lib/utils";
import React, { InputHTMLAttributes, forwardRef } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { AddProductFormValues } from "./dashboard/DashboardAddProduct";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof AddProductFormValues;
  register?: UseFormRegister<AddProductFormValues>;
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
        className="mb-1 text-lg font-semibold dark:text-stone-100"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        {...(register && register(name, registerRules))}
        className="h-12 rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-white dark:[color-scheme:dark]"
      />
      <div className="h-5 text-sm text-red-600 dark:text-red-500">
        {error && error}
      </div>
    </div>
  );
}
