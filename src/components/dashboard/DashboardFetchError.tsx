import React from "react";
import { BsListNested } from "react-icons/bs";

type Props = {
  className?: string;
  refetch: () => void;
  text: string;
};

export default function DashboardFetchError({
  className,
  refetch,
  text,
}: Props) {
  return (
    <section
      className={
        className
          ? className
          : "absolute flex w-full flex-col items-center h-full justify-center"
      }
    >
      <div className="flex flex-col items-center justify-center gap-2 -translate-y-20">
        <div className="flex items-center justify-center rounded-full border-4 w-10 h-10 text-xl font-bold text-red-500 border-red-500">
          !
        </div>
        <p className="mt-2 text-stone-300">{text}</p>
        <button
          type="button"
          className="h-9 px-4 rounded-lg  font-semibold text-stone-100 transition-colors dark:bg-red-900/70 dark:hover:bg-red-900/80  dark:focus:bg-red-900/50"
          onClick={refetch}
        >
          Réessayer
        </button>
      </div>
    </section>
  );
}
