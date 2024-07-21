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
    // <div className="w-80 rounded-md bg-neutral-900 p-2 px-4">
    <div className="w-auto rounded-md bg-neutral-200 p-2 px-4 dark:bg-neutral-950">
      <section className="flex h-10 items-center justify-between gap-10">
        <p className="line-clamp-1 text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <DashboardShippingLocationsCardDropdown
          className="w-min"
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      </section>
      <hr className="border-neutral-300 dark:border-neutral-900" />
      <section className="flex w-full flex-col gap-1.5 py-2 [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-between [&>div]:text-sm">
        <div>
          <p className="text-neutral-600 dark:text-neutral-500">Wilaya</p>
          <p className="capitalize text-neutral-900 dark:text-neutral-200">
            {wilaya.code} - {wilaya.name}
          </p>
        </div>
        <div>
          <p className="text-neutral-600 dark:text-neutral-500">Commune</p>
          <p className="capitalize text-neutral-900 dark:text-neutral-200">
            {town.name}
          </p>
        </div>
        <div>
          <p className="text-neutral-600 dark:text-neutral-500">Coordonnées</p>
          {coordinates ? (
            <a
              className="text-secondary hover:underline"
              href={coordinates}
              target="_blank"
            >
              Google Maps
            </a>
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400">
              Non précisée
            </p>
          )}
        </div>
        <div>
          <p className="text-neutral-600 dark:text-neutral-500">
            Tarifs additionnels
          </p>
          <p
            className={`${
              additionalCosts
                ? "text-neutral-900 dark:text-neutral-200"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {additionalCosts ? `${additionalCosts}DA` : "Aucun"}
          </p>
        </div>
      </section>
    </div>
  );
}
