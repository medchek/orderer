import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerRules?: RegisterOptions;
  error?: string;
  id?: string;
}

export default function Textarea<T extends FieldValues>({
  label,
  id,
  name,
  register,
  registerRules,
  error,
  className,
  ...props
}: Props<T>) {
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
        className={cn(
          "h-12 min-h-[48px] rounded-lg bg-neutral-200 px-4 pt-3 text-sm placeholder-[#979797] outline-hidden ring-secondary focus:ring-2 dark:bg-neutral-900 dark:text-white dark:[color-scheme:dark] 2xl:text-base",
          className,
        )}
      ></textarea>
      <div className="h-5 text-sm text-red-600 dark:text-red-500">
        {error && error}
      </div>
    </div>
  );
}
