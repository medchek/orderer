"use client";
import React from "react";
import { OrderFormValues } from "./order-form/OrderForm";
import { Wilaya } from "@/store/wilayaSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { addPartitive } from "@/lib/utils";
import { Town } from "@/store/orderFormSlice";
import { useGetLocations } from "@/features/shipping-locations/api/getLocations";
import { useStore } from "@/store";

interface Props {
  data: OrderFormValues;
  selectedWilaya: Wilaya;
  selectedTown: Town;
}

function SummaryFieldName(props: { children: React.ReactNode }) {
  return (
    <p className="w-28 min-w-[7rem] text-neutral-800 dark:text-neutral-100 lg:w-40">
      {props.children}
    </p>
  );
}

export default function OrderConfirm({
  data,
  selectedWilaya,
  selectedTown,
}: Props) {
  const { data: sessionData } = useSession();
  const { shippingLocationsQueryFilters } = useStore();
  const { data: locationQueryData } = useGetLocations(
    shippingLocationsQueryFilters,
  );

  const fullName = () => {
    const { name, lastName: lastname } = data;
    if (!name && !lastname) {
      return "Non mentionné";
    } else {
      const fullName = `${lastname ?? ""} ${name ?? ""}`;
      return fullName.trim();
    }
  };

  /**
   * Displays the user home address if provided. If not, displays the shipping
   * location name if available and selected, otherwise, displays a message
   * indicating that the shipping will be delivered to the current wilaya's
   * shipping office.
   * @returns correctly formatted address string
   */
  const address = () => {
    if (data.address) {
      return data.address;
    } else {
      if (data.locationId && locationQueryData) {
        const shippingLocation = locationQueryData.data.find(
          ({ id }) => id === data.locationId,
        );

        if (shippingLocation) {
          const { name, coordinates } = shippingLocation;
          return (
            <span>
              {name}
              {coordinates ? (
                <>
                  <span className="mx-1 text-neutral-500">&bull;</span>
                  <a
                    className="font-normal text-blue-500 hover:underline"
                    target="_blank"
                    href={coordinates}
                  >
                    Google Maps
                  </a>
                </>
              ) : null}
            </span>
          );
        }
      }

      return `Bureau de livraison de la wilaya ${addPartitive(
        selectedWilaya.name,
      )}`;
    }
  };

  return (
    <section className="flex w-full grow flex-col gap-2 text-sm lg:text-base [&>div]:flex [&>div]:h-12 [&>div]:w-full [&>div]:items-center [&>div]:rounded-lg [&>div]:bg-neutral-200 [&>div]:px-4 [&>div]:text-neutral-900 dark:[&>div]:bg-neutral-900 dark:[&>div]:text-neutral-50">
      <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50 lg:text-lg">
        Résumé
      </h2>
      <div>
        <SummaryFieldName>Téléphone</SummaryFieldName>
        <p className="font-semibold">{data.phone}</p>
      </div>
      <div>
        <SummaryFieldName>Wilaya</SummaryFieldName>
        <p className="font-semibold">{selectedWilaya.name}</p>
      </div>
      <div>
        <SummaryFieldName>Commune</SummaryFieldName>
        <p className="font-semibold capitalize">{selectedTown.name}</p>
      </div>
      <div>
        <SummaryFieldName>Adresse</SummaryFieldName>
        <p className="line-clamp-2 inline font-semibold">{address()}</p>
      </div>
      <div>
        <SummaryFieldName>Nom/Prénom</SummaryFieldName>
        <p className="font-semibold">{fullName()}</p>
      </div>
      {!sessionData && (
        <p className="text-xs text-neutral-500 lg:text-sm">
          <Link
            href="/login"
            className="text-secondary hover:underline focus:underline"
          >
            Connectez vous
          </Link>{" "}
          pour sauvegarder vos information de livraison
        </p>
      )}
    </section>
  );
}
