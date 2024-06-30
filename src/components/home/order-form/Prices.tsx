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
    selectedProductsQuantity,
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

  /**
   * the price of all the products without the shipping cost
   */
  const productsPrice = Object.keys(selectedProducts).reduce(
    (prev, current): number => {
      const currentProduct = selectedProducts[current];
      // get the price of each selected product, including the
      const currentProductPrice = discountedPrice(
        currentProduct.price,
        currentProduct.discount,
      );
      // get the quantity of each selected product
      const currentProductQuantity = selectedProductsQuantity[current];
      // calulcate based on the quantity
      const quantifiedCurrentProductPrice =
        currentProductPrice * currentProductQuantity;
      return prev + quantifiedCurrentProductPrice;
    },
    0,
  );

  // const productsPrice = selectedProducts.reduce((prevVal, currentVal) => {
  //   return prevVal + discountedPrice(currentVal.price, currentVal.discount);
  // }, 0);

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
