"use client";

import { useEffect } from "react";
import TypeSelectorButton from "./TypeSelectorButton";
import Input from "../../Input";
import { orderFormValidators } from "@/lib/formValidators";
import { useFormContext } from "react-hook-form";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import { addPartitive } from "@/lib/utils";
import { OrderFormValues } from "./OrderForm";
import ShippingLocationsSelect from "@/features/shipping-locations/components/ShippingLocationsSelect";

export default function ShippingTypeSelector() {
  const { shippingType, setShippingType, selectedWilaya, confirmData } =
    useStore();

  const {
    setValue,
    unregister,
    register,
    resetField,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  useEffect(() => {
    setValue("isHome", confirmData?.isHome ?? true);
  }, []);

  useEffect(() => {
    if (shippingType === SHIPPING_TYPE.OFFICE) {
      resetField("address");
      setValue(
        "address",
        `Bureau de livraison de la wilaya ${
          !selectedWilaya ? "sélectionnée" : addPartitive(selectedWilaya.name)
        }`,
      );
    } else {
      setValue("address", confirmData?.address ?? "");
    }
  }, [shippingType, selectedWilaya, confirmData]);

  const handleSelectShippingType = (type: SHIPPING_TYPE) => {
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
    <div className="flex w-full gap-4 2xl:gap-7">
      <div className="flex w-1/2 flex-col gap-1">
        <p className="font-semibold dark:text-white 2xl:text-lg">
          Type de Livraison
        </p>
        <div className="flex h-12 gap-2 2xl:gap-4">
          <TypeSelectorButton
            text="À Domicile"
            isSelected={shippingType === SHIPPING_TYPE.HOME}
            onClick={() => handleSelectShippingType(SHIPPING_TYPE.HOME)}
          />
          <TypeSelectorButton
            text="Au Bureau de Livraison"
            isSelected={shippingType === SHIPPING_TYPE.OFFICE}
            onClick={() => handleSelectShippingType(SHIPPING_TYPE.OFFICE)}
          />
        </div>
      </div>
      <div className="w-1/2">
        {shippingType === SHIPPING_TYPE.HOME ? (
          <Input<OrderFormValues>
            register={register}
            registerRules={{
              required:
                shippingType === SHIPPING_TYPE.HOME
                  ? "Ce champ est obligatoire"
                  : false,
              validate: orderFormValidators.address,
            }}
            name="address"
            error={errors.address?.message}
            label="Adresse de Livraison"
            placeholder="Votre adresse"
            type="text"
            id="address"
            maxLength={200}
            minLength={10}
            defaultValue={confirmData?.address}
            autoComplete="on"
          />
        ) : (
          <ShippingLocationsSelect />
        )}
      </div>
    </div>
  );
}
