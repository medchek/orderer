import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {}

export default function DashboardCategoryPagination({ ...props }: Props) {
  return (
    <div className="h-14 min-h-[3.5rem] w-full flex items-center justify-center">
      <div>
        <ReactPaginate
          {...props}
          className="w-full flex gap-2 text-stone-50"
          breakLabel="..."
          nextLabel={<MdChevronRight className="w-7 h-7" />}
          previousLabel={<MdChevronRight className="w-7 h-7 rotate-180 " />}
          nextLinkClassName="flex justify-center items-center w-8 h-8 bg-stone-950 hover:bg-stone-800  rounded-md"
          previousLinkClassName="flex justify-center items-center w-8 h-8 bg-stone-950 hover:bg-stone-800  rounded-md"
          breakLinkClassName="flex font-bold justify-center items-center w-8 h-8 bg-stone-950 hover:bg-stone-800  rounded-md"
          pageLinkClassName="w-8 h-8 bg-stone-950 hover:bg-stone-800  rounded-md font-semibold flex justify-center items-center"
          disabledLinkClassName="opacity-40 hover:!bg-stone-950 cursor-not-allowed"
          activeLinkClassName="!bg-secondary"
          pageRangeDisplayed={3}
          // marginPagesDisplayed={2}
        />
      </div>
    </div>
  );
}
