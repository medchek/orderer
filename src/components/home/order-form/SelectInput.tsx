import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { MdChevronRight } from "react-icons/md";

interface Props<T extends FieldValues>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  isLoading?: boolean;
  label?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerRules?: RegisterOptions<T, Path<T>>;
  children: React.ReactNode;
  error?: string;
  textRight?: string;
  /** Hides the element dedicated to display error messages that is always present even when no error is displayeds */
  removeErrorSpace?: boolean;
  /** Makes the chevron, loader, and text smaller */
  small?: boolean;
  /** Hides the chevron */
  hideArrow?: boolean;
}

export default function SelectInput<T extends FieldValues>({
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
  hideArrow,
  className,
  ...props
}: Props<T>) {
  const inputRegister = register && register(name, registerRules);
  return (
    <div className="flex w-full flex-col gap-1">
      {label?.length && (
        <label
          htmlFor={id}
          className="font-semibold text-neutral-900 dark:text-neutral-100"
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
            "h-12 w-full appearance-none rounded-lg bg-neutral-200 px-4 text-neutral-900 placeholder-[#979797] outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-neutral-300 dark:[color-scheme:dark]",
            small ? "text-sm" : "text-sm 2xl:text-base",
            className,
          )}
        >
          {isLoading && (
            <option value="" disabled>
              Chargement...
            </option>
          )}

          {children}
        </select>

        {isLoading ? (
          <Loader
            className={clsx(
              "absolute dark:border-neutral-500 dark:border-b-transparent",
              {
                "right-1 h-4 w-4": small,
                "right-4 h-6 w-6": !small,
              },
            )}
          />
        ) : (
          !hideArrow && (
            <MdChevronRight
              className={clsx(
                "pointer-events-none absolute rotate-90 text-neutral-800 dark:text-neutral-500",
                {
                  "right-1 h-5 w-5": small,
                  "right-4 h-7 w-7": !small,
                },
              )}
            />
          )
        )}
      </div>
      <div
        className={`flex h-3 justify-between lg:h-5 ${
          removeErrorSpace && "hidden"
        }`}
      >
        <p className="grow text-sm text-red-500">{error && error}</p>
        <p className="grow-0 text-right text-neutral-800 dark:text-neutral-100">
          {textRight}
        </p>
      </div>
    </div>
  );
}
