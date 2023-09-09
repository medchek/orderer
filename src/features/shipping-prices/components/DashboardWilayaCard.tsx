import { Wilaya } from "@/store/wilayaSlice";
import clsx from "clsx";
import React from "react";
import { MdEdit } from "react-icons/md";

interface Props {
  wilaya: Wilaya;
  isSelected: boolean;
  handleSelectClick: () => void;
  handleEditClick: () => void;
}

export default function DashboardWilayaCard({
  wilaya: {
    code,
    name,
    availableHome,
    availableOffice,
    homePrice,
    officePrice,
  },
  handleSelectClick,
  isSelected,
  handleEditClick,
}: Props) {
  return (
    <div
      className={clsx(
        "w-auto h-[13.5rem] rounded-lg bg-stone-950 px-4 py-3 flex flex-col text-stone-100 gap-2 max-h-[13.5rem]",
        { "ring-2": isSelected }
      )}
      key={code}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="h-5 w-5"
          id={`wilaya-${code}-checkbox`}
          checked={isSelected}
          onChange={handleSelectClick}
        />
        <label htmlFor={`wilaya-${code}-checkbox`} className="w-full">
          {code} - {name}
        </label>
      </div>
      <hr className="border-stone-900" />
      <section className="text-sm">
        <p className="text-stone-600 mb-1">Livraison à domicile</p>
        <div className="flex items-center justify-between">
          <p>{homePrice}DA</p>
          <div
            className={clsx(
              "px-2 rounded-md h-7 flex items-center justify-center",
              availableHome
                ? "bg-zinc-900 text-blue-400"
                : "bg-red-950/25 text-red-400"
            )}
          >
            {availableHome ? "Disponible" : "Non disponible"}
          </div>
        </div>
      </section>
      <section className="text-sm">
        <p className="text-stone-600 mb-1">Livraison au bureau</p>
        <div className="flex items-center justify-between">
          <p>{officePrice}DA</p>
          <div
            className={clsx(
              "px-2 rounded-md h-7 flex items-center justify-center",
              availableOffice
                ? "bg-zinc-900 text-blue-400"
                : "bg-red-950/25 text-red-400"
            )}
          >
            {availableOffice ? "Disponible" : "Non disponible"}
          </div>
        </div>
      </section>
      <button
        type="button"
        className="gap-1 dark:bg-stone-900 h-8 rounded-md dark:hover:bg-stone-800 dark:focus:bg-stone-900/50 text-sm"
        onClick={handleEditClick}
      >
        <MdEdit className="h-5 w-5" />
        Modifier
      </button>
    </div>
  );
}
