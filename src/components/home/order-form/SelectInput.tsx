import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { MdChevronRight } from "react-icons/md";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isLoading?: boolean;
  label?: string;
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  registerRules?: RegisterOptions;
  children: React.ReactNode;
  error?: string;
  textRight?: string;
  /** Hides the element dedicated to display error messages that is always present even when no error is displayeds */
  removeErrorSpace?: boolean;
  /** Makes the chevron, loader, and text smaller */
  small?: boolean;
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
  removeErrorSpace,
  small,
  className,
  ...props
}: Props) {
  const inputRegister = register && register(name, registerRules);
  return (
    <div className="flex w-full flex-col gap-1">
      {label?.length && (
        <label
          htmlFor={id}
          className="font-semibold dark:text-white 2xl:text-lg"
        >
          {label}
        </label>
      )}

      <div className="relative flex w-full items-center">
        <select
          disabled={isLoading || disabled}
          id={id}
          {...props}
          {...inputRegister}
          className={cn(
            "h-12 w-full appearance-none rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-neutral-300 dark:[color-scheme:dark]",
            small ? "text-sm" : "text-sm 2xl:text-base",
            className,
          )}
        >
          {isLoading && <option value="" disabled>Chargement...</option>}

          {children}
        </select>

        {isLoading ? (
          <Loader
            className={clsx("absolute  border-neutral-500", {
              "right-1 h-4 w-4": small,
              "right-4 h-6 w-6": !small,
            })}
          />
        ) : (
          <MdChevronRight
            className={clsx(
              "pointer-events-none absolute  rotate-90 dark:text-neutral-500",
              {
                "right-1 h-5 w-5": small,
                "right-4 h-7 w-7": !small,
              },
            )}
          />
        )}
      </div>
      <div
        className={`flex h-5 justify-between ${removeErrorSpace && "hidden"}`}
      >
        <p className="grow text-sm text-red-500">{error && error}</p>
        <p className="grow-0 text-right dark:text-gray-100">{textRight}</p>
      </div>
    </div>
  );
}
