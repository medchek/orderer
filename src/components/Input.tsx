import { cn } from "@/lib/utils";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerRules?: RegisterOptions<T, Path<T>>;
  error?: string;
  id?: string;
  /** Displays information underneath the input */
  info?: string;
  /** Removes the space occupied by the error message that is always present even if the error is not empty */
  removeErrorHeight?: boolean;
}

export default function Input<T extends FieldValues>({
  label,
  id,
  name,
  register,
  registerRules,
  error,
  removeErrorHeight,
  hidden,
  info,
  className,
  ...props
}: Props<T>) {
  const inputId = id ? id : `${name}-input`;
  return (
    <div
      className={clsx("flex w-full flex-col", {
        hidden: hidden,
        "mb-1": !removeErrorHeight,
      })}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 2xl:text-base"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        {...props}
        {...(register && register(name, registerRules))}
        className={cn(
          "h-12 rounded-lg bg-neutral-200 px-4 text-sm text-neutral-900 placeholder-neutral-500 outline-hidden ring-secondary focus:ring-2 disabled:cursor-not-allowed disabled:text-neutral-400 dark:bg-neutral-900 dark:text-white dark:[color-scheme:dark] 2xl:text-base",
          className,
        )}
      />
      <div
        className={clsx(
          "h-3 text-sm lg:h-5",
          removeErrorHeight && "hidden",
          info && !error
            ? "text-neutral-600"
            : "text-red-600 dark:text-red-500",
        )}
      >
        {(error && info) || error ? error : info}
      </div>
    </div>
  );
}
