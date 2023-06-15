"use client";
import { MdChevronRight } from "react-icons/md";
import React, { SelectHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";

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
  ...props
}: Props) {
  const {
    fetchPublicWilayas,
    wilayas,
    isFetchingWilayas: isFetching,
    shippingType,
  } = useStore((state) => state);

  useEffect(() => {
    fetchPublicWilayas().catch((err) => {
      console.log("error fetching wilayas in component", err);
    });
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
  const [selectedValue, setSelectedValue] = useState(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wilayaCode = parseInt(e.target.value);
    setSelectedValue(wilayaCode);
    const targetWilaya = wilayas.find((w) => w.code === wilayaCode);

    if (targetWilaya) {
      setShippingPrice({
        home: targetWilaya.homePrice,
        office: targetWilaya.officePrice,
      });
    }
  };

  const selectOptions = wilayas.map((wilaya) => (
    <option value={wilaya.code} key={wilaya.code} defaultValue={16}>
      {wilaya.code} - {wilaya.name} (
      {shippingType === SHIPPING_TYPE.HOME
        ? wilaya.homePrice
        : wilaya.officePrice}
      DA)
    </option>
  ));

  return (
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <div className="relative flex items-center h-12 w-full">
        <select
          disabled={isFetching}
          {...props}
          {...(register && register(name, registerRules))}
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
          <span className="absolute right-4 w-6 h-6 border-2 border-r-transparent border-stone-400 rounded-full animate-spin"></span>
        ) : (
          <MdChevronRight
            className={`absolute right-4 rotate-90 w-8 h-8 pointer-events-none ${
              isFetching && "text-stone-400"
            }`}
          />
        )}
      </div>
      <span className="w-full text-right">{displayShippingPrice()}</span>
    </div>
  );
}
