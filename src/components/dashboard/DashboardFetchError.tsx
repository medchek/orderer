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
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-red-600 text-xl font-bold text-red-600">
          !
        </div>
        <p className="mt-2 text-sm text-neutral-700 dark:text-stone-300">
          {text ?? "Une érreur est survenu, veuillez reéssayer"}
        </p>
        <button
          type="button"
          className="h-9 rounded-lg bg-red-600 px-4 text-sm font-semibold text-stone-100 transition-colors hover:bg-red-500 active:bg-red-700 dark:bg-red-900/70 dark:hover:bg-red-900/80 dark:active:bg-red-900/50"
          onClick={refetch}
        >
          Réessayer
        </button>
      </div>
    </section>
  );
}
