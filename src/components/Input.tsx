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
    <div className="flex flex-col w-full mb-1">
      <label htmlFor={id} className="text-lg font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        {...(register && register(name, registerRules))}
        className="h-12 rounded-lg bg-[#ECECEC] placeholder-[#979797] px-4 outline-secondary"
      />
      <div className="h-5 text-red-600 text-sm">{error && error}</div>
    </div>
  );
}

export default Input;
