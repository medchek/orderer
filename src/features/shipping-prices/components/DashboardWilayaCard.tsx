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

const AvailabilityBadge = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <div
      className={clsx(
        "flex h-7 items-center justify-center rounded-md px-2",
        isAvailable
          ? "bg-neutral-50 text-blue-500 dark:bg-zinc-900 dark:text-blue-400"
          : "bg-neutral-50 text-red-500 dark:bg-red-950/25 dark:text-red-400",
      )}
    >
      {isAvailable ? "Disponible" : "Non disponible"}
    </div>
  );
};

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
        "flex h-[13.5rem] max-h-[13.5rem] w-auto flex-col gap-2 rounded-lg bg-neutral-200 px-4 py-3 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100",
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
      <hr className="border-neutral-400/70 dark:border-neutral-900" />
      <section className="text-sm">
        <p className="mb-1 text-neutral-500 dark:text-neutral-600">
          Livraison à domicile
        </p>
        <div className="flex items-center justify-between">
          <p>{homePrice > 0 ? `${homePrice}DA` : "Gratuite"}</p>
          <AvailabilityBadge isAvailable={availableHome} />
        </div>
      </section>
      <section className="text-sm">
        <p className="mb-1 text-neutral-500 dark:text-neutral-600">
          Livraison au bureau
        </p>
        <div className="flex items-center justify-between">
          <p>{officePrice > 0 ? `${officePrice}DA` : "Gratuite"}</p>

          <AvailabilityBadge isAvailable={availableOffice} />
        </div>
      </section>
      <button
        type="button"
        className="h-8 gap-1 rounded-md bg-neutral-300 text-sm font-medium outline-hidden hover:bg-neutral-400/70 active:bg-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-900/50"
        onClick={handleEditClick}
      >
        <MdEdit className="size-5" />
        Modifier
      </button>
    </div>
  );
}
