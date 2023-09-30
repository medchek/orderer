import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import clsx from "clsx";
import React from "react";
import { BiFilterAlt } from "react-icons/bi";

interface Props {
  disabled?: boolean;
  hasFilters?: boolean;
  children: React.ReactNode;
  onApplyFiltersClick: () => void;
  onResetFiltersClick: () => void;
}

export default function FilterPopover({
  disabled,
  hasFilters,
  onApplyFiltersClick,
  onResetFiltersClick,
  children,
}: Props) {
  return (
    <Popover modal={false}>
      <PopoverTrigger
        title="Filtrer par"
        disabled={disabled}
        className={clsx(
          "flex h-10 items-center justify-center gap-1 rounded-lg px-6  shadow-md outline-none transition-colors disabled:cursor-not-allowed dark:bg-neutral-900 dark:hover:bg-neutral-800  dark:focus:bg-neutral-950 disabled:dark:bg-neutral-950 dark:disabled:text-neutral-600",

          { "text-secondary": hasFilters, "text-stone-400": !hasFilters },
        )}
      >
        <BiFilterAlt className="h-6 w-6" /> Filtrer
      </PopoverTrigger>

      <PopoverContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="z-10 flex w-96 flex-col gap-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-500 outline-none"
      >
        <div className="flex h-8 items-center justify-between">
          <p className="text-base text-stone-300">Filtrer</p>
          {hasFilters && <p className="text-stone-600">Filtres appliqués</p>}
        </div>

        <section>{children}</section>
        <section className="mt-2 flex h-11 items-center justify-end gap-2 border-t border-t-neutral-800">
          <button
            type="button"
            className=" mt-1 h-8 rounded-md px-2 text-neutral-400 transition-colors hover:text-neutral-200 active:bg-neutral-800"
            onClick={onResetFiltersClick}
          >
            Réinitialiser
          </button>
          <button
            type="button"
            className=" mt-1 h-8 w-20 rounded-md bg-blue-600 text-neutral-100 transition-colors hover:bg-blue-500 focus:bg-blue-700"
            onClick={onApplyFiltersClick}
          >
            Appliquer
          </button>
        </section>
      </PopoverContent>
    </Popover>
  );
}