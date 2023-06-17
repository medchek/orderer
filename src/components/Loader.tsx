import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
/**
 * A spinning loader. By default it has a hight and width of 24px and a stone-400 tw color.
 *
 * If the className prop is present, the default width, hight and border colors are removed and need to be supplied.
 */
export default function Loader({ className }: Props) {
  return (
    <div
      className={`border-2 border-r-transparent rounded-full animate-spin ${
        className ? className : "w-6 h-6 border-stone-400"
      }`}
    ></div>
  );
}
