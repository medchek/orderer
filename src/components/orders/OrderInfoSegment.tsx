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
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-lg text-stone-200">{title}</h3>
      <ul className="[&>li>span]:inline-block space-y-4 list-none w-full">
        {data.map(({ label, content, capitalize }, i) => (
          <li
            key={i}
            className={`w-full flex ${justifyBetween && "justify-between"}`}
          >
            <span className="w-48 text-stone-400">{label}</span>
            <span className={capitalize ? "capitalize" : ""}>
              {!content ? "Non mentioné" : content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
