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
import SelectInput from "./SelectInput";
import { orderFormValidators } from "@/lib/formValidators";
import { toPositiveNumber } from "@/lib/utils";
import { useGetTowns } from "@/features/shipping-prices/api/getTowns";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";

interface Props<T extends { town: string }>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  id: string;
  register: UseFormRegister<T>;
  registerRules?: RegisterOptions;
  /** set the default value of a react-hook-form form using the setValue function. Uses the defaultValue value. */
  setFormHookValue?: UseFormSetValue<T>;

  error?: string;
  defaultValue?: string | number;
}

export default function TownSelect<T extends { town: string }>({
  id,
  register,
  error,
  registerRules,
  defaultValue,
  setFormHookValue,
  ...props
}: Props<T>) {
  const { selectedWilaya, setSelectedTown } = useStore((state) => state);

  // const inputRegister = register && register(name, registerRules);

  const { data: wilayasData, isFetching: isFetchingWilayas } = useGetWilayas();

  const { isFetching: isFetchingTowns, data: townsData } = useGetTowns(
    selectedWilaya?.code ?? 0,
    {
      enabled:
        selectedWilaya !== null &&
        selectedWilaya.code > 0 &&
        selectedWilaya.code <= 58 &&
        wilayasData &&
        wilayasData.length > 0,
    },
  );

  // used to track and set the default input value.
  // Needed to display the default message (value="") acting as a placeholder
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    // prevent any value changes while data is being fetched
    if (isFetchingTowns || isFetchingWilayas) return;
    // if data has been fetched, procceed to the rest

    if (defaultValue) {
      const selectedTown = townsData?.find((town) => {
        const townCode =
          typeof defaultValue === "string"
            ? toPositiveNumber(defaultValue)
            : defaultValue;

        return town.code === townCode;
      });
      if (selectedTown) {
        setSelectedTown(selectedTown);
        setSelectedValue(defaultValue.toString());
        if (setFormHookValue) {
          console.log("setting default town value to =>", defaultValue);
          setFormHookValue(
            "town" as Path<T>,
            defaultValue.toString() as PathValue<T, Path<T>>,
          );
        }
      }
    }
  }, [
    defaultValue,
    isFetchingTowns,
    isFetchingWilayas,
    setFormHookValue,
    setSelectedTown,
    townsData,
  ]);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const townCode = e.target.value;
    setSelectedValue(townCode);

    const selectedTown = townsData?.find(
      (town) => town.code === toPositiveNumber(townCode),
    );
    if (selectedTown) {
      setSelectedTown(selectedTown);
    }
  };

  const selectOptions = townsData?.map(({ code, name }) => {
    return (
      <option value={code} key={code} className="capitalize">
        {name}
      </option>
    );
  });

  return (
    <SelectInput<T>
      className={selectedValue ? "capitalize" : ""}
      disabled={
        isFetchingTowns || !selectedWilaya || !wilayasData || isFetchingWilayas
      }
      name={"town" as Path<T>}
      label="Commune"
      error={error}
      register={register}
      registerRules={{
        required: "Aucune commune n'a été selectionnée",
        validate: orderFormValidators.town,
        onChange: handleOnChange,
        ...registerRules,
      }}
      id={id}
      value={selectedValue}
      isLoading={isFetchingTowns}
      {...props}
    >
      {(!selectedWilaya || !wilayasData || isFetchingWilayas) && (
        <option value="" disabled hidden>
          Selectionnez une wilaya d&apos;abord
        </option>
      )}

      {selectedWilaya && townsData
        ? [
            <option className="text-white" value="" disabled hidden key="0">
              Selectionnez votre commune
            </option>,
            ...(selectOptions ?? []),
          ]
        : null}
    </SelectInput>
  );
}
