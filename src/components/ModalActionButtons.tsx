import { type DOMAttributes } from "react";
import Loader from "./Loader";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface BaseProps {
  /** className for the container */
  className?: string;
  /** className for the confirm button */
  confirmClassName?: string;
  id?: string;
  isLoading?: boolean;
  disableSubmit?: boolean;
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
  disableSubmit,
  className,
  onConfirm,
  confirmClassName,
  id,
}: SubmitConfirmType | ButtonConfirmType) {
  return (
    <section
      id={id}
      className={cn("flex items-center justify-end gap-4 px-1 py-4", className)}
    >
      <button
        type="button"
        className="h-10 w-36 rounded-md font-bold text-neutral-500 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:active:bg-neutral-950"
        onClick={onCancel}
        disabled={disableCancel}
      >
        {cancelText ?? "Annuler"}
      </button>
      <Button
        type={confirmButtonType}
        className={cn(
          "h-10 w-36 font-bold disabled:cursor-not-allowed",
          confirmClassName,
        )}
        disabled={isLoading || disableSubmit}
        onClick={onConfirm}
      >
        {isLoading ? (
          <Loader className="h-6 w-6" />
        ) : (
          <span>{confirmText}</span>
        )}
      </Button>
    </section>
  );
}
