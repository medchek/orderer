"use client";
import { Status } from "@prisma/client";

import DashboardOrdersFilter from "./DashboardOrdersFilter";


export type StatusFilter = {
  value: Status | "";
  text: string;
};

export default function DashboardOrdersToolbar() {
  return (
    <div
      id="orders-toolbar"
      className="flex h-16 min-h-[4rem] w-full items-center justify-end "
    >
      {/* <div className="w-full text-sm flex gap-1">
        {statusFilter.map(({ text }, i) => (
          <button
            key={text}
            type="button"
            onClick={() => handleStatusClick(i)}
            className={clsx("px-2 h-10 border-b-4", {
              "border-stone-400 font-semibold text-stone-400 ":
                i === selectedStatusFilterIndex,
              "border-transparent text-stone-500 hover:text-stone-300":
                i !== selectedStatusFilterIndex,
            })}
          >
            {text}
          </button>
        ))}
      </div> */}

      <div className="flex gap-2">
        <DashboardOrdersFilter />

        {/* <form onSubmit={handleSearchSubmit}>
          <DashboardSearchInput
            placeholder={`Chercher par ${searchBy[selectedSearchByIndex].text}`}
            onChange={(e) => setSearchTerm(e.target.value.trim())}
            maxLength={selectedSearchByIndex === 0 ? 10 : ORDER_CODE_LENGTH}
            minLength={2}
          />
        </form> */}
        {/* 
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            title="Chercher une commande par"
            className="dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950  transition-colors h-10 w-10 rounded-lg outline-none shadow-md text-stone-400 flex items-center justify-center"
          >
            <MdOutlineManageSearch className="h-7 w-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            avoidCollisions
            sideOffset={10}
            align="end"
            className="flex flex-col gap-1 px-2 z-10 p-2 bg-neutral-900 border border-neutral-800 rounded-lg outline-none text-sm text-stone-50"
          >
            <DropdownMenuLabel className="px-2 text-stone-500">
              Chercher par
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {searchBy.map((v, i) => (
              <DropdownMenuItem
                key={v.text}
                className="h-8 hover:bg-neutral-800 text-neutral-200 flex items-center gap-1.5 px-2 rounded-md hover:outline-none cursor-pointer"
                onClick={() => handleSearchByClick(i)}
              >
                <span className="w-28 first-letter:capitalize">{v.text}</span>
                {selectedSearchByIndex === i && <MdCheck className="w-5 h-5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}
