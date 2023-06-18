"use client";

import React, { useEffect } from "react";
import TypeSelectorButton from "./TypeSelectorButton";
import Input from "../Input";
import { orderFormValidators } from "@/lib/formValidators";
import { useFormContext } from "react-hook-form";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";

export default function ShippingTypeSelector() {
  const { shippingType, setShippingType } = useStore();
  const { setValue, unregister } = useFormContext();

  useEffect(() => {
    setValue("isHome", true);
  }, []);

  const handleSelectShippingTye = (type: SHIPPING_TYPE) => {
    if (type === shippingType) return;
    // unregister the address field from the form if the isHome != true
    if (type === SHIPPING_TYPE.OFFICE) {
      unregister("address");
    }
    // set the value of the form field
    setValue("isHome", type === SHIPPING_TYPE.HOME);
    // update store value as well
    setShippingType(type);
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full space-y-4">
      <span className="flex flex-col space-y-1 w-full">
        <p className="text-lg font-semibold">Type de Livraison</p>
        <div className="flex h-12 space-x-4">
          <TypeSelectorButton
            text="À Domicile"
            isSelected={shippingType === SHIPPING_TYPE.HOME}
            onClick={() => handleSelectShippingTye(SHIPPING_TYPE.HOME)}
          />
          <TypeSelectorButton
            text="Au Bureau de Livraison"
            isSelected={shippingType === SHIPPING_TYPE.OFFICE}
            onClick={() => handleSelectShippingTye(SHIPPING_TYPE.OFFICE)}
          />
        </div>
      </span>
      {shippingType === SHIPPING_TYPE.HOME ? (
        <Input
          register={register}
          registerRules={{
            required:
              shippingType === SHIPPING_TYPE.HOME
                ? "Ce champ est obligatoire"
                : false,
            validate: orderFormValidators.address,
          }}
          name="address"
          error={errors["address"]?.message as string}
          label="Adresse de Livraison"
          placeholder="Votre adresse"
          type="text"
          id="address"
          maxLength={200}
          minLength={10}
        />
      ) : (
        <p className="text-stone-900">
          En sélectionnant ce type de livraison vous devez vous déplacer au
          bureau de livraison de votre wilaya pour récupérer votre commande.{" "}
        </p>
      )}
    </div>
  );
}
