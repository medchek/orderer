"use client";
import React from "react";
import { OrderFormValues } from "./order-form/OrderForm";
import { Wilaya } from "@/store/wilayaSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { addPartitive } from "@/lib/utils";
import { Town } from "@/store/orderFormSlice";

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
  const fullName = () => {
    const { name, lastName: lastname } = data;
    if (!name && !lastname) {
      return "Non mentioné";
    } else {
      const fullName = `${lastname ?? ""} ${name ?? ""}`;
      return fullName.trim();
    }
  };
  return (
    <section className=" flex w-full grow flex-col gap-2 text-sm lg:text-base [&>div]:flex [&>div]:h-12 [&>div]:w-full [&>div]:items-center [&>div]:rounded-lg [&>div]:bg-neutral-200 [&>div]:px-4 [&>div]:text-neutral-900 [&>div]:dark:bg-neutral-900 [&>div]:dark:text-neutral-50">
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
        <p className="line-clamp-2 inline font-semibold">
          {data.address !== ""
            ? data.address
            : `Bureau de livraison de la wilaya ${addPartitive(
                selectedWilaya.name,
              )}`}
        </p>
      </div>
      <div>
        <SummaryFieldName>Nom/Prénom</SummaryFieldName>
        <p className="font-semibold">{fullName()}</p>
      </div>
      {/* <div>
        <p className="w-40 text-stone-100">Email</p>
        <p className="font-semibold">
          {!data.email ? "Non mentioné" : data.email}
        </p>
      </div> */}
      {!sessionData && (
        <p className="text-xs text-neutral-500 lg:text-sm">
          <Link
            href="/login"
            className="text-secondary hover:underline focus:underline"
          >
            Connectez vous
          </Link>{" "}
          pour sauvgarder vos information de livraison
        </p>
      )}
    </section>
  );
}
