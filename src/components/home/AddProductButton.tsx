import React from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-0.5 px-1 rounded-md text-[#171717] hover:text-[#535353] focus:bg-[#F4F4F4] transition-colors"
    >
      <MdAdd className="h-6 w-6" />
      <span className="text-sm font-semibold">Ajouter un Produit</span>
    </button>
  );
}
