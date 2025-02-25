export default function ProductCardLoader() {
  return (
    <div className="relative flex h-[460px] w-auto animate-pulse flex-col overflow-hidden rounded-lg bg-neutral-50 transition-all hover:shadow-xl dark:bg-neutral-950">
      <div className="pointer-events-none relative aspect-square h-[210px] max-h-[210px] w-full bg-neutral-300  dark:bg-neutral-800"></div>
      {/* text */}
      <section className="flex grow flex-col justify-between p-2">
        <section className="flex flex-col gap-4">
          <div className="h-6 w-11/12 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>

          <div className="h-5 w-8/12 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>
          <section className="flex flex-col gap-1">
            <div className="h-4 w-5/6 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>
            <div className="h-4 w-2/12 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>
            <div className="h-4rounded w-11/12 bg-neutral-300 dark:bg-neutral-800"></div>
            <div className="h-4 w-1/3 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>
            <div className="h-4 w-2/3 rounded-sm bg-neutral-300 dark:bg-neutral-800"></div>
          </section>
        </section>
        {/* Buttons */}

        <div className="flex items-center justify-between gap-2">
          <div className="h-7 w-auto grow rounded-md bg-neutral-300 dark:bg-neutral-800"></div>
          <div className="h-7 w-7 rounded-md bg-neutral-300 dark:bg-neutral-800"></div>
        </div>
      </section>
    </div>
  );
}
