"use client";
import { cn, toNumber } from "@/lib/utils";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {
  /** href link used to render link tags which preceedes the page number */
  href?: string;

  /** Allows for selecting the number of items to display per-page */
  perPageDisplay?: {
    /** The function to run when a the user selects a options in the per-page select input */
    setPerPageCount: (n: number) => void;
    /** The current per-page count */
    count: number;
    /** The text to display after the per-page select element  */
    text: string;
    /** An array containing the count options the user can select from */
    perPageOptions?: number[];
  };
}

export default function DashboardPagination({
  href,
  perPageDisplay,
  className,
  ...props
}: Props) {
  const perPageOptions = perPageDisplay?.perPageOptions ?? [
    5, 7, 9, 10, 15, 20, 25,
  ];
  const handlePerPageOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!perPageDisplay) return;
    const value = toNumber(e.target.value);
    perPageDisplay.setPerPageCount(value);
  };

  return (
    <div
      className={cn(
        "relative flex h-12 min-h-[3rem] w-full items-center justify-center",
        className,
      )}
      id="dashboard-pagination"
    >
      <div>
        <ReactPaginate
          {...props}
          hrefBuilder={href ? (page) => href + page : undefined}
          className="flex w-full gap-2 text-neutral-800 dark:text-stone-50"
          breakLabel="..."
          nextLabel={<MdChevronRight className="size-7" />}
          previousLabel={<MdChevronRight className="size-7 rotate-180" />}
          nextLinkClassName="flex size-8 items-center justify-center rounded-md bg-neutral-300 hover:bg-neutral-400/70 dark:bg-stone-950 dark:hover:bg-stone-800"
          previousLinkClassName="flex size-8 items-center justify-center rounded-md bg-neutral-300 hover:bg-neutral-400/70 dark:bg-stone-950 dark:hover:bg-stone-800"
          breakLinkClassName="flex size-8 items-center justify-center rounded-md bg-stone-950 font-bold hover:bg-stone-800"
          pageLinkClassName="flex size-8 items-center justify-center rounded-md bg-neutral-300 font-semibold hover:bg-neutral-400/70 dark:bg-stone-950 dark:hover:bg-stone-800"
          disabledLinkClassName="cursor-not-allowed opacity-40 hover:bg-[#D4D4D4]! dark:hover:bg-stone-950!"
          activeLinkClassName="bg-secondary! text-neutral-50"
          pageRangeDisplayed={3}
          // marginPagesDisplayed={2}
          renderOnZeroPageCount={null}
          // onPageChange={(e) => {
          //   console.log("chaned!", e.selected);
          // }}
        />
      </div>
      {perPageDisplay && (
        <div className="absolute right-0 flex h-10 select-none items-center gap-2 text-sm text-stone-400 lg:text-base">
          <span>Afficher</span>
          <select
            className="flex h-10 items-center justify-center rounded-md px-1 text-base text-neutral-800 dark:bg-neutral-900 dark:text-stone-200"
            value={perPageDisplay.count}
            onChange={handlePerPageOnChange}
          >
            {perPageOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <span>{perPageDisplay.text}</span>
        </div>
      )}
    </div>
  );
}
