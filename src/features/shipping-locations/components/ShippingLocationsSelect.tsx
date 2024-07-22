import SelectInput from "@/components/home/order-form/SelectInput";
import React, { useEffect, useState } from "react";
import { useGetWilayaLocations } from "../api/getWilayaLocations";
import { useStore } from "@/store";
import { addPartitive } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function ShippingLocationsSelect() {
  const { selectedWilaya, setSelectedShippingLocationId } = useStore();
  const {
    register,
    resetField,
    formState: { errors },
  } = useFormContext<{ locationId: string }>();

  const { data, isFetching } = useGetWilayaLocations(
    selectedWilaya?.code ?? 0,
    {
      enabled: selectedWilaya !== null,
    },
  );

  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setSelectValue("");
  }, [isFetching]);

  useEffect(() => {
    resetField("locationId");
  }, [selectedWilaya, resetField]);

  const displayOptions = () => {
    // in case it's fetching return null so that the component display fetching message

    if (isFetching) return null;
    if (!selectedWilaya)
      return (
        <option value="" hidden>
          Bureau de livraison de la wilaya sélectionnée
        </option>
      );

    if (data) {
      if (data.length > 0) {
        return [
          <option value="" key="00ff" hidden>
            Sélectionnez un point de livraison
          </option>,
          ...data.map((location) => (
            <option value={location.id} key={location.id}>
              {location.name}
              {location.additionalCosts
                ? ` (+${location.additionalCosts}DA)`
                : ""}
            </option>
          )),
        ];
      } else {
        // if the wilaya has no attached location, display the default value
        return (
          <option value="">
            Bureau de livraison de la wilaya
            {addPartitive(selectedWilaya?.name ?? "")}
          </option>
        );
      }
    }

    // in any other case, return nothing
    return null;
  };

  const validateRequired = () => {
    if (data && data.length > 0) {
      return "Sélectionnez un point de livraison";
    }
  };

  return (
    <SelectInput
      label="Point de livraison"
      name="locationId"
      isLoading={isFetching}
      hideArrow={!data || data.length === 0 || !selectedWilaya}
      disabled={isFetching || !data || data.length === 0}
      value={selectValue}
      id="location-select"
      register={register}
      registerRules={{
        required: validateRequired(),
        onChange: (e) => {
          const value = e.target.value.trim();
          setSelectValue(value);
          setSelectedShippingLocationId(value);
        },
      }}
      error={errors.locationId?.message}
    >
      {displayOptions()}
    </SelectInput>
  );
}
