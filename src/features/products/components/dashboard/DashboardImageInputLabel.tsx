import React from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  count: number;
}

export default function DashboardImageInputLabel({ count, ...props }: Props) {
  return (
    <label
      className="flex aspect-square w-56 cursor-pointer flex-col items-center justify-center rounded-xl text-sm  text-stone-400 transition-all dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950"
      title="Ajouter une image"
      {...props}
    >
      <TbPhotoPlus className="h-12 w-12" />
      <p>Ajouter une image</p>
      <p>{count}/5</p>
    </label>
  );
}
