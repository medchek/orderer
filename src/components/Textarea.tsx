import { randInputId } from "@/lib/utils";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  registerRules?: RegisterOptions;
  error?: string;
  id?: string;
}

export default function Textarea({
  label,
  id,
  name,
  register,
  registerRules,
  error,
  ...props
}: Props) {
  const textareaId = id ? id : `${name}-textarea`;
  return (
    <div className="mb-1 flex w-full flex-col">
      <label
        htmlFor={textareaId}
        className="mb-1 text-lg font-semibold dark:text-stone-100"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        {...props}
        {...(register && register(name, registerRules))}
        className="h-12 min-h-[48px] rounded-lg bg-[#ECECEC] px-4 pt-3 placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-white dark:[color-scheme:dark]"
      ></textarea>
      <div className="h-5 text-sm text-red-600 dark:text-red-500">
        {error && error}
      </div>
    </div>
  );
}
