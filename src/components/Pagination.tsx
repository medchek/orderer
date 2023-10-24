"use client";
import { cn, toNumber } from "@/lib/utils";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {
  /** href link used to render link tags which preceedes the page number */
  href?: string;
  perPageCount?: {
    setPerPageCount: (n: number) => void;
    count: number;
    text: string;
  };
}

export default function Pagination({
  href,
  perPageCount,
  className,
  ...props
}: Props) {
  const perPageOptions = [5, 7, 9, 10, 15, 20, 25];
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!perPageCount) return;
    const value = toNumber(e.target.value);
    perPageCount.setPerPageCount(value);
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
          className="flex w-full gap-2 text-neutral-900 dark:text-neutral-50"
          breakLabel="..."
          nextLabel={<MdChevronRight className="h-7 w-7" />}
          previousLabel={<MdChevronRight className="h-7 w-7 rotate-180 " />}
          nextLinkClassName="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-950  hover:dark:bg-neutral-800"
          previousLinkClassName="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-950  hover:dark:bg-neutral-800"
          breakLinkClassName="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-950 font-bold  hover:bg-neutral-800"
          pageLinkClassName="flex h-8 w-8 items-center  justify-center rounded-md bg-neutral-300 font-semibold hover:bg-neutral-200 dark:bg-neutral-950 hover:dark:bg-neutral-800"
          disabledLinkClassName="cursor-not-allowed !bg-neutral-200 opacity-40 dark:!bg-neutral-950 hover:dark:!bg-neutral-950"
          activeLinkClassName="!bg-secondary text-neutral-50"
          pageRangeDisplayed={3}
          // marginPagesDisplayed={2}
          renderOnZeroPageCount={null}
          // onPageChange={(e) => {
          //   console.log("chaned!", e.selected);
          // }}
        />
      </div>
      {perPageCount && (
        <div className="absolute right-0 flex h-10 items-center gap-2 text-sm text-neutral-400">
          <span>Afficher</span>
          <select
            className="flex h-10 items-center justify-center rounded-md bg-neutral-900 px-1 text-base text-neutral-200"
            value={perPageCount.count}
            onChange={handleOnChange}
          >
            {perPageOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <span>{perPageCount.text}</span>
        </div>
      )}
    </div>
  );
}
