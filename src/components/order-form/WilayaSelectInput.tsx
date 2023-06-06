import { randInputId } from "@/lib/utils";
import { MdChevronRight } from "react-icons/md";
import React, { SelectHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  registerRules?: RegisterOptions;
  error?: string;
}

function SelectInput({
  label,
  id,
  register,
  registerRules,
  name,
  ...props
}: Props) {
  return (
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <div className="relative flex items-center h-12 w-full">
        <select
          {...props}
          {...(register && register(name, registerRules))}
          id={id}
          className="w-full h-12 rounded-lg bg-[#ECECEC] placeholder-[#979797] px-4 appearance-none outline-secondary"
        >
          <option value={16}>Alger</option>
          <option value={35}>Boumerdes</option>
        </select>
        <MdChevronRight className="absolute right-4 rotate-90 w-8 h-8 pointer-events-none" />
      </div>
      <span className="w-full text-right">+400 DA</span>
    </div>
  );
}

export default SelectInput;
