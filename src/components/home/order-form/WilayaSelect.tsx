"use client";
import React, { SelectHTMLAttributes, useEffect } from "react";
import {
  Path,
  PathValue,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useState } from "react";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import SelectInput from "./SelectInput";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";
import { toPositiveNumber } from "@/lib/utils";

interface Props<T extends { wilaya: string }>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  register: UseFormRegister<T>;
  registerRules?: RegisterOptions;
  /** set the default value of a react-hook-form form using the setValue function. Uses the defaultValue value. */
  setFormHookValue?: UseFormSetValue<T>;
  error?: string;
  hidePrice?: boolean;
  defaultValue?: string | number;
}

export default function WilayaSelect<T extends { wilaya: string }>({
  id,
  register,
  hidePrice,
  error,
  registerRules,
  defaultValue,
  setFormHookValue,
  ...props
}: Props<T>) {
  const { shippingType, setSelectedWilaya } = useStore((state) => state);

  const { isFetching, data: wilayaData } = useGetWilayas();

  // used to track and set the default input value.
  // Needed to display the default message (value=0) acting as a placeholder
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // update the register value on change
    const wilayaCode = e.target.value;
    // set the selected wilaya value
    setSelectedValue(wilayaCode);

    // look for the wilaya
    const targetWilaya = wilayaData?.find(
      (w) => w.code === toPositiveNumber(wilayaCode),
    );
    // set the price accordingly
    if (targetWilaya) {
      // save the selectedWilya in the store
      setSelectedWilaya(targetWilaya);
    }
  };

  useEffect(() => {
    if (wilayaData) {
      if (defaultValue) {
        const defaultVal =
          typeof defaultValue === "number"
            ? defaultValue.toString()
            : defaultValue;
        const defaultWilaya = wilayaData?.find(
          ({ code }) => code === toPositiveNumber(defaultVal),
        );

        if (defaultWilaya) {
          setSelectedWilaya(defaultWilaya);
          setSelectedValue(defaultVal);
          if (setFormHookValue) {
            setFormHookValue(
              "wilaya" as Path<T>,
              defaultVal as PathValue<T, Path<T>>,
            );
          }
        }
      }
    }
  }, [
    wilayaData,
    defaultValue,
    setSelectedValue,
    setSelectedWilaya,
    setFormHookValue,
  ]);
  const selectOptions = () => {
    if (wilayaData) {
      return [
        <option value="" disabled hidden key="0">
          Selectionnez la wilaya de livraison
        </option>,
        wilayaData.map((wilaya) => {
          return (
            <option value={wilaya.code} key={wilaya.code}>
              {wilaya.code} - {wilaya.name}
              {!hidePrice &&
                ` (${
                  shippingType === SHIPPING_TYPE.HOME
                    ? wilaya.homePrice
                    : wilaya.officePrice
                }DA)`}
            </option>
          );
        }),
      ];
    }
  };

  return (
    <SelectInput<T>
      {...props}
      disabled={isFetching}
      isLoading={isFetching}
      name={"wilaya" as Path<T>}
      label="Wilaya de livraison"
      error={error}
      register={register}
      registerRules={{
        required: "Aucune wilaya n'a été selectionnée",
        ...registerRules,
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
