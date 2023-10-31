"use client";
import { GetWilayaShippingLocationsSuccessResponse } from "@/features/shipping-locations/api/getWilayaLocations";
import { queryKeys } from "@/lib/queryKeys";
import { discountedPrice } from "@/lib/utils";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function Prices() {
  const {
    selectedProducts,
    selectedWilaya,
    shippingType,
    selectedShippingLocationId,
  } = useStore();

  const queryClient = useQueryClient();
  const [additionalLocationPrice, setAdditionalLocationPrice] =
    useState<number>(0);
  useEffect(() => {
    if (
      !selectedWilaya ||
      !selectedShippingLocationId ||
      selectedShippingLocationId.length <= 0
    )
      return;

    const locations =
      queryClient.getQueryData<GetWilayaShippingLocationsSuccessResponse>(
        queryKeys.locations.wilayaSpecific(selectedWilaya.code).queryKey,
      );

    if (locations && locations.length > 0) {
      const selectedLocation = locations.find(
        (loc) => loc.id === selectedShippingLocationId,
      );

      if (selectedLocation) {
        setAdditionalLocationPrice(selectedLocation.additionalCosts ?? 0);
      }
    }
  }, [selectedShippingLocationId, selectedWilaya]);

  const productsPrice = selectedProducts.reduce((prevVal, currentVal) => {
    return prevVal + discountedPrice(currentVal.price, currentVal.discount);
  }, 0);

  const shippingPrice = useCallback(() => {
    return selectedWilaya === null // if no wilaya is selected, set the price to 0
      ? 0
      : shippingType === SHIPPING_TYPE.HOME
      ? selectedWilaya.homePrice
      : selectedWilaya.officePrice + additionalLocationPrice;
  }, [additionalLocationPrice, selectedWilaya, shippingType]);

  const totalPrice = productsPrice + shippingPrice();

  return (
    <ul>
      <li className="flex justify-between space-x-7">
        <span>Prix de Livraison:</span>
        <span>{shippingPrice()} DA</span>
      </li>
      <li className="flex justify-between space-x-7 font-semibold">
        <span>Prix Total:</span>
        <span>{totalPrice} DA</span>
      </li>
    </ul>
  );
}
