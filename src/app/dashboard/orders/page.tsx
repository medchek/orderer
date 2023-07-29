"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";

type Props = {};

export default function ShippingPrices({}: Props) {
  return (
    <div
      id="orders"
      className="flex w-full grow flex-col overflow-y-hidden px-6 py-3"
    >
      <DashboardHeader label="Commandes" noPadding />
      <div
        id="orders-toolbar"
        className="flex h-16 min-h-[4rem] w-full items-center justify-end "
      >
        <DashboardSearchInput placeholder="Cherche une commande" />
      </div>
      <div className="h-full w-full">
        <table className="table-fixed text-left">
          <thead>
            <tr className="h-20 text-sm text-stone-500">
              <th className="w-28 pl-4">#</th>
              <th className="w-36">Telephone</th>
              <th className="w-28">Wilaya</th>
              <th className="w-64 2xl:w-72">Adresse</th>
              <th className="w-64 2xl:w-72">Produits</th>
              <th className="w-28">Prix</th>
              <th className="w-44">Statut</th>
              <th className="w-32">Date</th>
              <th className="w-auto">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-white">
            {Array.from({ length: 4 }, (_, i) => (
              <tr
                key={i}
                className="h-32 [&>td]:pr-6 [&>td]:pt-4 [&>td]:align-top"
              >
                <td className="text-stone pl-4">E5RC6X6</td>
                <td className="font-semibold">0550211562</td>
                <td>Alger</td>
                <td>Cité 8 Mai 1945, Gué de constantine, Alger.</td>
                <td className="[&>p]:line-clamp-1">
                  <p>Apple Watch Series 8 Gps azeiuazoieuaze</p>
                  <p>Samsung Earbuds Pro 2 a azeazeazeaze </p>
                  <p>Samsung S23 Protective Ca azeazeazeazeaze</p>
                </td>
                <td>36400DA</td>
                <td>
                  <p className="flex w-3/4 items-center justify-center rounded-lg bg-stone-950 p-2 text-blue-600">
                    Non confirmé
                  </p>
                </td>
                <td>02/09/2023</td>
                <td className="flex gap-2">
                  <button className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900">
                    <MdOutlineSettings className="h-6 w-6" />
                  </button>
                  <button className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900">
                    <MdDeleteOutline className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
