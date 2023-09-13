"use client";
import React, { SelectHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import SelectInput from "./SelectInput";
import { OrderFormValues } from "./OrderForm";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";


interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  register: UseFormRegister<OrderFormValues>;
  registerRules?: RegisterOptions;
  error?: string;
}

export default function WilayaSelect({
  id,
  register,
  ...props
}: Props) {
  const { shippingType, setSelectedWilaya, confirmData } = useStore(
    (state) => state
  );

  const { isFetching, data } = useGetWilayas();

  // used to track and set the default input value.
  // Needed to display the default message (value=0) acting as a placeholder
  const [selectedValue, setSelectedValue] = useState(confirmData?.wilaya ?? 0);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // update the register value on change
    const wilayaCode = parseInt(e.target.value);
    // set the selected wilaya value
    setSelectedValue(wilayaCode);

    // look for the wilaya
    const targetWilaya = data?.find((w) => w.code === wilayaCode);
    // set the price accordingly
    if (targetWilaya) {
      // save the selectedWilya in the store
      setSelectedWilaya(targetWilaya);
    }
  };

  const selectOptions = () => {
    if (data) {
      return [
        <option value={0} disabled hidden key="0">
          Selectionnez la wilaya de livraison
        </option>,
        data.map((wilaya) => {
          return (
            <option value={wilaya.code} key={wilaya.code}>
              {wilaya.code} - {wilaya.name} (
              {shippingType === SHIPPING_TYPE.HOME
                ? wilaya.homePrice
                : wilaya.officePrice}
              DA)
            </option>
          );
        }),
      ];
    }
  };

  return (
    <SelectInput
      {...props}
      disabled={isFetching}
      isLoading={isFetching}
      name="wilaya"
      label="Wilaya de Livraison"
      register={register}
      registerRules={{
        required: "Aucune wilaya n'a été selectionnée",
        // validate: orderFormValidators.wilaya,
        onChange: handleOnChange,
      }}
      id={id}
      // className="h-12 w-full appearance-none rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 disabled:cursor-not-allowed dark:bg-input-dark dark:text-white dark:[color-scheme:dark] 2xl:text-base text-sm"
      value={selectedValue}
    >
      {selectOptions()}
    </SelectInput>
  );
}
