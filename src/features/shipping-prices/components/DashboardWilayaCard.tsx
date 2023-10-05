import { Wilaya } from "@/store/wilayaSlice";
import clsx from "clsx";
import React from "react";
import { MdEdit } from "react-icons/md";

interface Props {
  wilaya: Wilaya;
  isSelected?: boolean;
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
        "flex h-[13.5rem] max-h-[13.5rem] w-auto flex-col gap-2 rounded-lg bg-stone-950 px-4 py-3 text-stone-100",
        { "ring-2": isSelected },
      )}
      key={code}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="h-5 w-5"
          id={`wilaya-${code}-checkbox`}
          checked={!!isSelected}
          onChange={handleSelectClick}
        />
        <label htmlFor={`wilaya-${code}-checkbox`} className="w-full">
          {code} - {name}
        </label>
      </div>
      <hr className="border-stone-900" />
      <section className="text-sm">
        <p className="mb-1 text-stone-600">Livraison à domicile</p>
        <div className="flex items-center justify-between">
          <p>{homePrice > 0 ? `${homePrice}DA` : "Gratuite"}</p>
          <div
            className={clsx(
              "flex h-7 items-center justify-center rounded-md px-2",
              availableHome
                ? "bg-zinc-900 text-blue-400"
                : "bg-red-950/25 text-red-400",
            )}
          >
            {availableHome ? "Disponible" : "Non disponible"}
          </div>
        </div>
      </section>
      <section className="text-sm">
        <p className="mb-1 text-stone-600">Livraison au bureau</p>
        <div className="flex items-center justify-between">
          <p>{officePrice > 0 ? `${officePrice}DA` : "Gratuite"}</p>

          <div
            className={clsx(
              "flex h-7 items-center justify-center rounded-md px-2",
              availableOffice
                ? "bg-zinc-900 text-blue-400"
                : "bg-red-950/25 text-red-400",
            )}
          >
            {availableOffice ? "Disponible" : "Non disponible"}
          </div>
        </div>
      </section>
      <button
        type="button"
        className="h-8 gap-1 rounded-md text-sm dark:bg-stone-900 dark:hover:bg-stone-800 dark:focus:bg-stone-900/50"
        onClick={handleEditClick}
      >
        <MdEdit className="h-5 w-5" />
        Modifier
      </button>
    </div>
  );
}
