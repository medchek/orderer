import FilterSelect from "@/components/filter/FilterSelect";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";
import { toPositiveNumber } from "@/lib/utils";
import React from "react";

interface Props {
  id?: string;
  onChange?: (v: number | null) => void;
  value?: number | null;
}

export default function ShippingLocationWilayaSelect({
  onChange,
  id,
  value,
}: Props) {
  const {
    data: wilayasData,
    isFetching: isFetchingWilayas,
    isSuccess,
  } = useGetWilayas();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value.trim();
    const value = v === "" ? null : toPositiveNumber(v);
    if (onChange) onChange(value);
  };

  const options = () => {
    if (isFetchingWilayas) {
      return (
        <option disabled value="">
          Chargement...
        </option>
      );
    }

    if (isSuccess && wilayasData.length > 0 && !isFetchingWilayas) {
      return [
        <option value="" key="0f">
          Non sélectionné
        </option>,
        wilayasData.map((w) => (
          <option value={w.code} key={w.code}>
            {w.code} - {w.name}
          </option>
        )),
      ];
    }

    return null;
  };

  return (
    <FilterSelect
      isLoading={isFetchingWilayas}
      disabled={isFetchingWilayas}
      onChange={handleOnChange}
      value={!value ? "" : value.toString()}
      id={id}
    >
      {options()}
    </FilterSelect>
  );
}
