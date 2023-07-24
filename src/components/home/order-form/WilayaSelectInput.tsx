"use client";
import { MdChevronRight } from "react-icons/md";
import React, { SelectHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import Loader from "../../Loader";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  register?: UseFormRegister<any>;
  registerRules?: RegisterOptions;
  error?: string;
}

export default function WilayaSelectInput({
  label,
  id,
  register,
  registerRules,
  name,
  error,
  ...props
}: Props) {
  const {
    fetchWilayas,
    wilayas,
    isFetchingWilayas: isFetching,
    shippingType,
    setSelectedWilaya,
  } = useStore((state) => state);

  const inputRegister = register && register(name, registerRules);
  useEffect(() => {
    if (wilayas.length === 0) {
      fetchWilayas().catch((err) => {
        console.log("error fetching wilayas in component", err);
      });
    }
  }, []);

  const [shippingPrice, setShippingPrice] = useState<{
    home: number;
    office: number;
  } | null>(null);

  const displayShippingPrice = () => {
    if (shippingPrice === null) return "";
    const price =
      shippingType === SHIPPING_TYPE.HOME
        ? shippingPrice.home
        : shippingPrice.office;
    if (price === 0) return "Gratuit";
    else return `+${price}DA`;
  };
  // used to track and set the default input value.
  // Needed to display the default message (value=0) acting as a placeholder
  const [selectedValue, setSelectedValue] = useState(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // update the register value on change
    if (inputRegister) inputRegister.onChange(e);

    const wilayaCode = parseInt(e.target.value);
    // set the selected wilaya value
    setSelectedValue(wilayaCode);
    // look for the wilaya within the store array
    const targetWilaya = wilayas.find((w) => w.code === wilayaCode);
    // set the price accordingly
    if (targetWilaya) {
      // save the selectedWilya in the store
      setSelectedWilaya(targetWilaya);

      setShippingPrice({
        home: targetWilaya.homePrice,
        office: targetWilaya.officePrice,
      });
    }
  };

  const selectOptions = wilayas.map((wilaya) => {
    return (
      <option value={wilaya.code} key={wilaya.code} defaultValue={16}>
        {wilaya.code} - {wilaya.name} (
        {shippingType === SHIPPING_TYPE.HOME
          ? wilaya.homePrice
          : wilaya.officePrice}
        DA)
      </option>
    );
  });

  return (
    <div className="flex w-full flex-col space-y-1">
      <label htmlFor={id} className="text-lg font-semibold dark:text-white">
        {label}
      </label>
      <div className="relative flex h-12 w-full items-center">
        <select
          disabled={isFetching}
          {...props}
          {...inputRegister}
          id={id}
          className={`h-12 w-full appearance-none rounded-lg bg-[#ECECEC] px-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-input-dark dark:text-white dark:[color-scheme:dark] ${
            isFetching && " cursor-not-allowed"
          }`}
          onChange={handleOnChange}
          value={selectedValue}
        >
          {isFetching ? (
            <option value="" defaultValue="">
              Chargement...
            </option>
          ) : (
            [
              <option className="text-white" value={0} disabled hidden key="0">
                Selectionnez la wilaya de livraison
              </option>,
              ...selectOptions,
            ]
          )}
        </select>

        {isFetching ? (
          <Loader className="absolute right-4 h-6 w-6 border-stone-400" />
        ) : (
          <MdChevronRight className="pointer-events-none absolute right-4 h-7 w-7 rotate-90 dark:text-[#979797]" />
        )}
      </div>
      <div className="flex h-5 justify-between ">
        <p className="grow text-sm text-red-600">{error && error}</p>
        <p className="grow-0 text-right dark:text-gray-100">
          {displayShippingPrice()}
        </p>
      </div>
    </div>
  );
}
