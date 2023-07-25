import React from "react";
import { OrderFormValues } from "./order-form/OrderForm";
import { Wilaya } from "@/store/wilayaSlice";

interface Props {
  data: OrderFormValues;
  selectedWilaya: Wilaya;
}

export default function OrderConfirm({ data, selectedWilaya }: Props) {
  const fullName = () => {
    const { name, lastname } = data;
    if (!name && !lastname) {
      return "Non mentioné";
    } else {
      const fullName = `${lastname} ${name}`;
      return fullName.trim();
    }
  };
  return (
    <section className=" flex w-full grow flex-col gap-3 py-4 text-sm xl:text-base [&>div]:flex [&>div]:h-14 [&>div]:w-full [&>div]:items-center [&>div]:rounded-lg [&>div]:px-4 [&>div]:text-white [&>div]:dark:bg-input-dark">
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
        <p className="w-40 text-stone-100">Adresse</p>
        <p className="font-semibold">{data.address}</p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Nom/Prénom</p>
        <p className="font-semibold">{fullName()}</p>
      </div>
      <div>
        <p className="w-40 text-stone-100">Email</p>
        <p className="font-semibold">
          {!data.email ? "Non mentioné" : data.email}
        </p>
      </div>
    </section>
  );
}
