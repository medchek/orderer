"use client";
import { MdChevronRight } from "react-icons/md";
import React, { SelectHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import Loader from "../Loader";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
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
    fetchPublicWilayas,
    wilayas,
    isFetchingWilayas: isFetching,
    shippingType,
    setSelectedWilaya,
  } = useStore((state) => state);

  const inputRegister = register && register(name, registerRules);
  useEffect(() => {
    if (wilayas.length === 0) {
      fetchPublicWilayas().catch((err) => {
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
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <div className="relative flex items-center h-12 w-full">
        <select
          disabled={isFetching}
          {...props}
          {...inputRegister}
          id={id}
          className={`w-full h-12 rounded-lg bg-[#ECECEC] placeholder-[#979797] px-4 appearance-none outline-secondary ${
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
              <option value={0} disabled hidden key="0">
                Selectionnez la wilaya de livraison
              </option>,
              ...selectOptions,
            ]
          )}
        </select>

        {isFetching ? (
          <Loader className="w-6 h-6 border-stone-400 absolute right-4" />
        ) : (
          <MdChevronRight className="absolute right-4 rotate-90 w-7 h-7 pointer-events-none" />
        )}
      </div>
      <div className="flex justify-between h-5 ">
        <p className="text-red-600 text-sm grow">{error && error}</p>
        <p className="text-right grow-0">{displayShippingPrice()}</p>
      </div>
    </div>
  );
}
