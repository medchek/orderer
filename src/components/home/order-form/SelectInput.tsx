import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { MdChevronRight } from "react-icons/md";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isLoading?: boolean;
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  registerRules?: RegisterOptions;
  children: React.ReactNode;
  error?: string;
  textRight?: string;
}

export default function SelectInput({
  isLoading,
  id,
  name,
  label,
  register,
  registerRules,
  children,
  error,
  disabled,
  textRight,
  className,
  ...props
}: Props) {
  const inputRegister = register && register(name, registerRules);
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="2xl:text-lg font-semibold dark:text-white">
        {label}
      </label>
      <div className="relative flex h-12 w-full items-center">
        <select
          disabled={isLoading || disabled}
          {...props}
          {...inputRegister}
          className={cn(
            "h-12 w-full appearance-none rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-white dark:[color-scheme:dark] 2xl:text-base text-sm",
            className
          )}
        >
          {children}
        </select>

        {isLoading ? (
          <Loader className="absolute right-4 h-6 w-6 border-stone-400" />
        ) : (
          <MdChevronRight className="pointer-events-none absolute right-4 h-7 w-7 rotate-90 dark:text-[#979797]" />
        )}
      </div>
      <div className="flex h-5 justify-between ">
        <p className="grow text-sm text-red-500">{error && error}</p>
        <p className="grow-0 text-right dark:text-gray-100">{textRight}</p>
      </div>
    </div>
  );
}
