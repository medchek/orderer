import React from "react";
import { MdSearch } from "react-icons/md";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function DashboardSearchInput({ ...props }: Props) {
  return (
    <div className="relative flex h-10 w-64 items-center">
      <MdSearch className="absolute left-2 h-6 w-6 text-stone-400" />
      <input
        type="search"
        className="h-full w-full rounded-lg bg-[#ECECEC] px-4 pl-10 pr-4 text-sm placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-white dark:[color-scheme:dark] "
        {...props}
      />
    </div>
  );
}
