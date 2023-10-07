"use client";
import DashboardShippingLocationsCardDropdown from "@/features/categories/components/DashboardCategoryDropdown";
import React from "react";
import { ShippingLocation } from "../types";

// interface Props extends Omit<ShippingLocation, "wilaya"> {}
interface Props extends ShippingLocation {
  onDeleteClick: () => void;
  onEditClick: () => void;
}

export default function DashboardShippingLocationsCard({
  onDeleteClick,
  onEditClick,
  additionalCosts,
  coordinates,
  name,
  wilaya,
  town,
}: Props) {
  return (
    // <div className="w-80 rounded-md bg-stone-900 p-2 px-4">
    <div className="w-auto rounded-md bg-stone-950 p-2 px-4">
      <section className="flex h-10 items-center justify-between gap-10">
        <p className="text-stone-100 line-clamp-1">{name}</p>
        <DashboardShippingLocationsCardDropdown
          className="w-min"
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      </section>
      <hr className="border-stone-900" />
      <section className="flex w-full flex-col gap-1.5 py-2 [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-between [&>div]:text-sm">
        <div>
          <p className="text-stone-500">Wilaya</p>
          <p className="capitalize text-stone-200">
            {wilaya.code} - {wilaya.name}
          </p>
        </div>
        <div>
          <p className="text-stone-500">Commune</p>
          <p className="capitalize text-stone-200">{town.name}</p>
        </div>
        <div>
          <p className="text-stone-500">Coordonnées</p>
          {coordinates ? (
            <a
              className="text-secondary hover:underline"
              href={coordinates}
              target="_blank"
            >
              Google Maps
            </a>
          ) : (
            <p className="text-neutral-400">Non précisée</p>
          )}
        </div>
        <div>
          <p className="text-stone-500">Tarifs additionnels</p>
          <p
            className={`${
              additionalCosts ? "text-stone-200" : "text-stone-400"
            }`}
          >
            {additionalCosts ? `${additionalCosts}DA` : "Aucun"}
          </p>
        </div>
      </section>
    </div>
  );
}
