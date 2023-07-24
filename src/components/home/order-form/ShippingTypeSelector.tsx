"use client";

import React, { useEffect } from "react";
import TypeSelectorButton from "./TypeSelectorButton";
import Input from "../../Input";
import { orderFormValidators } from "@/lib/formValidators";
import { useFormContext } from "react-hook-form";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import { addPartitive } from "@/lib/utils";
import { OrderFormValues } from "./OrderForm";

export default function ShippingTypeSelector() {
  const { shippingType, setShippingType, selectedWilaya } = useStore();

  const {
    setValue,
    unregister,
    register,
    resetField,
    setFocus,

    formState: { errors },
  } = useFormContext<OrderFormValues>();

  useEffect(() => {
    setValue("isHome", true);
  }, []);

  useEffect(() => {
    if (shippingType === SHIPPING_TYPE.OFFICE) {
      resetField("address");
      setValue(
        "address",
        `Bureau de livraison de la wilaya ${
          !selectedWilaya ? "sélectionnée" : addPartitive(selectedWilaya.name)
        }`
      );
    } else {
      resetField("address");
    }
  }, [shippingType, selectedWilaya]);

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

  return (
    <div className="flex w-full space-x-7">
      <div className="flex w-1/2 flex-col space-y-1">
        <p className="text-lg font-semibold dark:text-white">
          Type de Livraison
        </p>
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
      </div>
      <div className="w-1/2">
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
          defaultValue={
            shippingType === SHIPPING_TYPE.OFFICE
              ? `Bureau de livraison de la wilaya ${
                  !selectedWilaya
                    ? "sélectionnée"
                    : addPartitive(selectedWilaya.name)
                }`
              : undefined
          }
          disabled={shippingType === SHIPPING_TYPE.OFFICE}
          autoComplete={shippingType === SHIPPING_TYPE.OFFICE ? "off" : "on"}
        />
      </div>
    </div>
  );
}
