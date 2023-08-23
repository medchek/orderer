import { toNumber } from "@/lib/utils";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {
  perPageCount?: {
    setPerPageCount: (n: number) => void;
    count: number;
    text: string;
  };
}

export default function DashboardPagination({ perPageCount, ...props }: Props) {
  const perPageOptions = [5, , 7, 9, 10, 15, 20, 25];
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(!perPageCount) return
    const value = toNumber(e.target.value);
    perPageCount.setPerPageCount(value);
  };

  return (
    <div className="relative h-14 min-h-[3.5rem] w-full flex items-center justify-center">
      <div>
        <ReactPaginate
          {...props}
          className="w-full flex gap-2 text-stone-50"
          breakLabel="..."
          nextLabel={<MdChevronRight className="w-7 h-7" />}
          previousLabel={<MdChevronRight className="w-7 h-7 rotate-180 " />}
          nextLinkClassName="flex justify-center items-center w-10 h-10 bg-stone-950 hover:bg-stone-800  rounded-md"
          previousLinkClassName="flex justify-center items-center w-10 h-10 bg-stone-950 hover:bg-stone-800  rounded-md"
          breakLinkClassName="flex font-bold justify-center items-center w-10 h-10 bg-stone-950 hover:bg-stone-800  rounded-md"
          pageLinkClassName="w-10 h-10 bg-stone-950 hover:bg-stone-800  rounded-md font-semibold flex justify-center items-center"
          disabledLinkClassName="opacity-40 hover:!bg-stone-950 cursor-not-allowed"
          activeLinkClassName="!bg-secondary"
          pageRangeDisplayed={3}
          // marginPagesDisplayed={2}
          renderOnZeroPageCount={null}
          // onPageChange={(e) => {
          //   console.log("chaned!", e.selected);
          // }}
        />
      </div>
      {perPageCount && (
        <div className="absolute text-sm text-stone-400 h-10 right-0 flex items-center gap-2">
          <span>Afficher</span>
          <select
            className="bg-neutral-900 h-10 px-1 text-stone-200 rounded-md flex items-center justify-center text-base"
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
