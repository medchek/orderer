import { randomNumber } from "@/lib/utils";
import React from "react";

type Props = {};

export default function ProductCardLoader({}: Props) {
  return (
    <div className="relative flex h-[460px] w-auto animate-pulse flex-col overflow-hidden rounded-lg bg-white transition-all hover:shadow-xl dark:bg-card-dark">
      <div className="pointer-events-none relative aspect-square h-[210px] max-h-[210px] w-full bg-stone-200  dark:bg-[#39394a]"></div>
      {/* text */}
      <section className="flex grow flex-col justify-between p-2">
        <section className="flex flex-col gap-4">
          <div className="h-6 w-4/5 rounded-md bg-stone-400 dark:bg-[#39394a]"></div>
          <div className="flex flex-col gap-1">
            <div
              className="h-4 rounded bg-stone-400 dark:bg-[#39394a]"
              style={{
                width: `${randomNumber(30, 75)}%`, // w-3/4
              }}
            ></div>
            <div
              className="h-4rounded bg-stone-400 dark:bg-[#39394a]"
              style={{
                width: `${randomNumber(40, 70)}%`, // w-4/6
              }}
            ></div>
            <div
              className="h-4 rounded bg-stone-400 dark:bg-[#39394a]"
              style={{
                width: `${randomNumber(10, 20)}%`, // w-1/6
              }}
            ></div>
            <div
              className="h-4 rounded bg-stone-400 dark:bg-[#39394a]"
              style={{
                width: `${randomNumber(40, 92)}%`, // w-11/12
              }}
            ></div>
          </div>
        </section>
        {/* Buttons */}

        <div className="flex items-center justify-between gap-2">
          <div className="h-8 w-auto grow rounded-md bg-stone-400 dark:bg-[#39394a]"></div>
          <div className="h-8 w-8 rounded-md bg-stone-400 dark:bg-[#39394a]"></div>
        </div>
      </section>
    </div>
  );
}
