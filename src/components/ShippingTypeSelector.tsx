"use client";

import React, { useState } from "react";
import TypeSelectorButton from "./TypeSelectorButton";
import Input from "./Input";
import { orderFormValidators } from "@/lib/formValidators";
import { useFormContext } from "react-hook-form";

export default function ShippingTypeSelector() {
  const [isHome, setIsHome] = useState(true);
  const handleClick = (bool: boolean) => {
    if (isHome === bool) return;
    if (isHome === false) resetField("address", { keepTouched: false });

    setIsHome(bool);
  };

  const {
    register,
    resetField,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full space-y-4">
      <span className="flex flex-col space-y-1 w-full">
        <p className="text-lg font-semibold">Type de Livraison</p>
        <div className="flex h-12 space-x-4">
          <TypeSelectorButton
            text="À Domicile"
            isSelected={isHome}
            onClick={() => handleClick(true)}
          />
          <TypeSelectorButton
            text="Au Bureau de Livraison"
            isSelected={!isHome}
            onClick={() => handleClick(false)}
          />
        </div>
      </span>
      {isHome && (
        <Input
          register={register}
          registerRules={{
            required: isHome ? "Ce champ est obligatoire" : false,
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
      )}
    </div>
  );
}
