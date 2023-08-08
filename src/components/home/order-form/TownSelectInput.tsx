"use client";
import React, { SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getTowns } from "@/lib/clientApiHelpers";
import SelectInput from "./SelectInput";
import { OrderFormValues } from "./OrderForm";
import { orderFormValidators } from "@/lib/formValidators";
import { toNumber } from "@/lib/utils";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  register: UseFormRegister<OrderFormValues>;
  error?: string;
}

export default function TownSelectInput({
  label,
  id,
  register,
  error,
  ...props
}: Props) {
  const { selectedWilaya, setSelectedTown, confirmData } = useStore(
    (state) => state
  );

  // const inputRegister = register && register(name, registerRules);

  const { isFetching, data } = useQuery({
    queryKey: ["towns", selectedWilaya?.code],
    // disabled the warning as the query is enable only if the selectedWilaya is not null
    queryFn: () => getTowns(selectedWilaya?.code!),
    enabled:
      selectedWilaya !== null &&
      selectedWilaya.code > 0 &&
      selectedWilaya.code <= 58,
  });

  // used to track and set the default input value.
  // Needed to display the default message (value=0) acting as a placeholder
  const [selectedValue, setSelectedValue] = useState(confirmData?.town ?? 0);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const townCode = toNumber(e.target.value);
    setSelectedValue(townCode);

    const selectedTown = data?.find((town) => town.code === townCode);
    if (selectedTown) {
      setSelectedTown(selectedTown);
    }
  };

  const selectOptions = data?.map(({ code, name }) => {
    return (
      <option value={code} key={code} className="capitalize">
        {name}
      </option>
    );
  });

  return (
    <SelectInput
      className={selectedValue ? "capitalize" : ""}
      disabled={isFetching || !selectedWilaya}
      name="town"
      label="Commune"
      error={error}
      register={register}
      registerRules={{
        required: "Aucune commune n'a été selectionnée",
        validate: orderFormValidators.town,
        onChange: handleOnChange,
      }}
      id={id}
      value={selectedValue}
      isLoading={isFetching}
      {...props}
    >
      {!selectedWilaya && (
        <option value="0" disabled hidden>
          Selectionnez une wilaya d'abord
        </option>
      )}

      {isFetching && <option value="">Chargement...</option>}

      {selectedWilaya && data
        ? [
            <option className="text-white" value={0} disabled hidden key="0">
              Selectionnez votre commune
            </option>,
            ...(selectOptions ?? []),
          ]
        : null}
    </SelectInput>
  );
}
