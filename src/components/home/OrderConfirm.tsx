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
      const fullName = `${lastname} ${name}`;
      return fullName.trim();
    }
  };
  return (
    <section className=" flex w-full grow flex-col gap-2 text-sm xl:text-base [&>div]:flex [&>div]:h-12 [&>div]:w-full [&>div]:items-center [&>div]:rounded-lg [&>div]:px-4 [&>div]:text-white [&>div]:dark:bg-neutral-900">
      <h2 className="text-lg font-semibold text-white">Résumé</h2>
      <div>
        <p className="w-40 text-stone-100">Téléphone</p>
        <p className="font-semibold">{data.phone}</p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Wilaya</p>
        <p className="font-semibold">{selectedWilaya.name}</p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Commune</p>
        <p className="font-semibold capitalize">{selectedTown.name}</p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Adresse</p>
        <p className="font-semibold">
          {data.address !== ""
            ? data.address
            : `Bureau de livraison de la wilaya ${addPartitive(
                selectedWilaya.name
              )}`}
        </p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Nom/Prénom</p>
        <p className="font-semibold">{fullName()}</p>
      </div>
      {/* <div>
        <p className="w-40 text-stone-100">Email</p>
        <p className="font-semibold">
          {!data.email ? "Non mentioné" : data.email}
        </p>
      </div> */}
      {!sessionData && (
        <p className="text-sm text-stone-500">
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
