import React from "react";
import Input from "./Input";
import WilayaSelectInput from "./WilayaSelectInput";
import ShippingTypeSelector from "./ShippingTypeSelector";

import { MdOutlineShoppingCart } from "react-icons/md";

type Props = {};

export default function OrderForm({}: Props) {
  return (
    <section id="order-form" className="mt-2 flex flex-col w-full grow ">
      {/* <div className="grow flex w-full space-x-7"> */}
      <div className="grow flex flex-col w-full space-y-">
        <div className="flex space-x-7">
          <Input label="Nom" placeholder="Votre Nom" />
          <Input label="Prénom" placeholder="Votre Prénom" />
        </div>
        <div className="flex space-x-7">
          <Input
            label="Telephone"
            type="tel"
            placeholder="Votre Numero de Téléphone"
          />
          <Input label="Email" type="email" placeholder="Votre Email" />
        </div>
        <div className="flex space-x-7">
          <WilayaSelectInput label="Wilaya de Livraison" />
          <ShippingTypeSelector />
        </div>
      </div>

      <button className="self-end bg-secondary font-semibold flex items-center justify-center space-x-4 text h-12 w-44 text-white rounded-lg hover:bg-[#4988fd] focus:bg-[#2670fa] transition-colors">
        <MdOutlineShoppingCart className="w-6 h-6" /> Commander
      </button>
    </section>
  );
}
