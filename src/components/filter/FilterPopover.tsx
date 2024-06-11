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
          "text-s flex h-9 items-center justify-center gap-1 rounded-lg  bg-neutral-100/70 px-4 shadow-md outline-none transition-colors disabled:cursor-not-allowed disabled:bg-neutral-300  disabled:shadow-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950 disabled:dark:bg-neutral-950 dark:disabled:text-neutral-600 lg:h-10 lg:px-6 lg:text-base",

          {
            "text-secondary": hasFilters,
            "text-neutral-600 dark:text-neutral-400": !hasFilters,
          },
        )}
      >
        <BiFilterAlt className="h-6 w-6" /> Filtrer
      </PopoverTrigger>

      <PopoverContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="z-10 flex w-full flex-col gap-1 rounded-lg border border-transparent bg-neutral-100 px-4 py-2 text-sm text-neutral-500 shadow-lg outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none lg:w-96 "
      >
        <div className="flex h-8 items-center justify-between">
          <p className="text-base text-neutral-800 dark:text-neutral-300">
            Filtrer
          </p>
          {hasFilters && <p className="text-neutral-600">Filtres appliqués</p>}
        </div>

        <section>{children}</section>
        <section className="mt-2 flex h-11 items-center justify-end gap-2 border-t border-t-neutral-300 dark:border-t-neutral-800">
          <button
            type="button"
            className=" mt-1 h-8 rounded-md px-2 text-neutral-600 transition-colors hover:text-neutral-700 active:bg-neutral-200 dark:text-neutral-400 hover:dark:text-neutral-200 active:dark:bg-neutral-800"
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
