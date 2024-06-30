import FilterSelect from "@/components/filter/FilterSelect";
import { useGetTowns } from "@/features/shipping-prices/api/getTowns";
import { toPositiveNumber } from "@/lib/utils";

import React from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
interface Props<T extends FieldValues> {
  register?: RegisterOptions<T>;
  wilayaCode: number | null;
  id?: string;
  onChange?: (v: number | null) => void;
  value?: number | null;
}
export default function ShippingLocationTownSelect<T extends FieldValues>({
  wilayaCode,
  id,
  value,
  onChange,
}: Props<T>) {
  const { data, isFetching } = useGetTowns(wilayaCode ?? 0, {
    enabled: wilayaCode !== null && wilayaCode > 0,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value.trim();
    const value = v === "" ? null : toPositiveNumber(v);
    if (onChange) onChange(value);
  };

  const options = () => {
    if (!wilayaCode) {
      return (
        <option value="" disabled>
          Selectionnez une wilaya
        </option>
      );
    }
    if (isFetching) {
      return (
        <option value="" disabled hidden>
          Chargement...
        </option>
      );
    }

    if (!isFetching && data && data.length > 0) {
      return [
        <option value="" key="0x">
          Non sélectionné
        </option>,
        data.map((town) => (
          <option value={town.code} key={town.code} className="capitalize">
            {town.name}
          </option>
        )),
      ];
    }

    return (
      <option value="" disabled hidden>
        Chargement...
      </option>
    );
  };
  return (
    <FilterSelect
      isLoading={isFetching}
      disabled={isFetching || !wilayaCode}
      onChange={handleOnChange}
      id={id}
      value={!value ? "" : value.toString()}
      className="first-letter:capitalize"
    >
      {options()}
    </FilterSelect>
  );
}
