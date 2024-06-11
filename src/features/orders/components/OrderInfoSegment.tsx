import React from "react";

interface Props {
  title: string;
  data: {
    label: string;
    content: React.ReactNode | string;
    capitalize?: boolean;
  }[];
  justifyBetween?: boolean;
}

export default function OrderInfoSegment({
  data,
  title,
  justifyBetween,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-200 lg:text-lg">
        {title}
      </h3>
      <ul className="w-full list-none space-y-4 text-sm lg:text-base [&>li>span]:inline-block">
        {data.map(({ label, content, capitalize }, i) => (
          <li
            key={i}
            className={`flex w-full ${justifyBetween && "justify-between"}`}
          >
            <span className="w-40 min-w-[10rem] text-neutral-900 dark:text-neutral-400 lg:w-48">
              {label}
            </span>
            <span className={capitalize ? "capitalize" : ""}>
              {!content ? "Non mentioné" : content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
