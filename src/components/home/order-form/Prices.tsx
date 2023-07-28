"use client";
import { discountedPrice } from "@/lib/utils";
import { useStore } from "@/store";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import React from "react";

type Props = {};

export default function Prices({}: Props) {
  const { selectedProducts, selectedWilaya, shippingType } = useStore();

  const productsPrice = selectedProducts.reduce((prevVal, currentVal) => {
    return prevVal + discountedPrice(currentVal.price, currentVal.discount);
  }, 0);

  const shippingPrice =
    selectedWilaya === null // if no wilaya is selected, set the price to 0
      ? 0
      : shippingType === SHIPPING_TYPE.HOME
      ? selectedWilaya.homePrice
      : selectedWilaya.officePrice;

  const totalPrice = productsPrice + shippingPrice;

  return (
    <ul>
      <li className="flex justify-between space-x-7">
        <span>Prix de Livraison:</span>
        <span>{shippingPrice} DA</span>
      </li>
      <li className="flex justify-between space-x-7 font-semibold">
        <span>Prix Total:</span>
        <span>{totalPrice} DA</span>
      </li>
    </ul>
  );
}
