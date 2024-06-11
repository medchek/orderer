"use client";
import { cn } from "@/lib/utils";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {
  /** href link used to render link tags which preceedes the page number */
  href?: string;
}

export default function Pagination({ href, className, ...props }: Props) {
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
    </div>
  );
}
