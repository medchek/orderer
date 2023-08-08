import React, { type DOMAttributes, type ButtonHTMLAttributes } from "react";
import Loader from "./Loader";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  isLoading?: boolean;
  disabledSubmit?: boolean;
  cancelText?: string;
  confirmText: string;
  disableCancel?: boolean;
  confirmButtonType?: "button" | "submit";
  onConfirm?: DOMAttributes<HTMLButtonElement>["onClick"];
  onCancel: () => void;
}

interface BaseProps {
  className?: string;
  id?: string;
  isLoading?: boolean;
  disabledSubmit?: boolean;
  cancelText?: string;
  confirmText: string;
  disableCancel?: boolean;
  onCancel: () => void;
}

interface SubmitConfirmType extends BaseProps {
  confirmButtonType?: "submit";
  onConfirm?: DOMAttributes<HTMLButtonElement>["onClick"];
}
interface ButtonConfirmType extends BaseProps {
  confirmButtonType?: "button";
  onConfirm: DOMAttributes<HTMLButtonElement>["onClick"];
}

export default function ModalActionButtons({
  onCancel,
  isLoading,
  cancelText,
  confirmText,
  disableCancel,
  confirmButtonType,
  disabledSubmit,
  className,
  onConfirm,
  id,
}: SubmitConfirmType | ButtonConfirmType) {
  return (
    <section
      id={id}
      className={cn("flex items-center justify-end gap-4 py-4 px-1", className)}
    >
      <button
        type="button"
        className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
        onClick={onCancel}
        disabled={disableCancel}
      >
        {cancelText ?? "Annuler"}
      </button>
      <button
        type={confirmButtonType}
        className="h-10 w-36 rounded-md bg-blue-600 font-bold text-white transition-colors hover:bg-secondary focus:bg-blue-700  disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 disabled:dark:bg-stone-600"
        disabled={isLoading || disabledSubmit}
        onClick={onConfirm}
      >
        {isLoading ? (
          <Loader className="h-6 w-6" />
        ) : (
          <span>{confirmText}</span>
        )}
      </button>
    </section>
  );
}
