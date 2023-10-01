import React from "react";

type Props = {
  className?: string;
  refetch: () => void;
  text?: string;
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
          : "absolute flex h-full w-full flex-col items-center justify-center"
      }
    >
      <div className="flex -translate-y-20 flex-col items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-red-500 text-xl font-bold text-red-500">
          !
        </div>
        <p className="mt-2 text-sm text-stone-300">
          {text ?? "Une érreur est survenu, veuillez reéssayer"}
        </p>
        <button
          type="button"
          className="h-9 rounded-lg px-4 text-sm font-semibold text-stone-100 transition-colors dark:bg-red-900/70 dark:hover:bg-red-900/80  dark:focus:bg-red-900/50"
          onClick={refetch}
        >
          Réessayer
        </button>
      </div>
    </section>
  );
}
