import React from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex h-6 items-center space-x-0.5 rounded-md px-1 text-neutral-800 transition-colors hover:text-[#535353] focus:bg-[#F4F4F4] dark:text-neutral-300 dark:hover:text-white dark:focus:bg-neutral-800"
    >
      <MdAdd className="h-6 w-6" />
      <span className="text-sm font-semibold">Ajouter un Produit</span>
    </button>
  );
}
