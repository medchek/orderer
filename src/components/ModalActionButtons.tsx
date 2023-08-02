import React, { type DOMAttributes, type ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface Props {
  id?: string;
  isLoading?: boolean;
  disabledSubmit?: boolean;
  cancelText?: string;
  confirmText: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disableCancel?: boolean;
  onConfirm: DOMAttributes<HTMLButtonElement>["onClick"];
  onCancel: () => void;
}

export default function ModalActionButtons({
  onCancel,
  isLoading,
  cancelText,
  confirmText,
  disableCancel,
  type,
  disabledSubmit,
  onConfirm,
  id,
}: Props) {
  return (
    <section id={id} className="flex items-center justify-end gap-4 py-4">
      <button
        type="button"
        className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
        onClick={onCancel}
        disabled={disableCancel}
      >
        {cancelText ?? "Annuler"}
      </button>
      <button
        type={type}
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
