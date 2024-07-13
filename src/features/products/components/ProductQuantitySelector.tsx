"use client";
import { MAX_PRODUCT_QUANTITY } from "@/lib/constants";
import { toPositiveNumber } from "@/lib/utils";
import { useStore } from "@/store";
import React, { useState } from "react";
import { IoAddOutline, IoRemove } from "react-icons/io5";

interface Props {
  /** Product code */
  code: string;
}

/**
 * @param onCLick callback to run on the button click
 * @param add display the add or substact sign according to the provided boolean
 */
const QuantityButton = ({
  onClick,
  add,
}: {
  onClick: () => void;
  add?: boolean;
}) => {
  return (
    <button
      className="size-8 rounded-md bg-neutral-200 active:scale-95 active:bg-neutral-300 active:text-white dark:bg-neutral-900 active:dark:bg-neutral-700 dark:active:bg-neutral-800"
      type="button"
      onClick={onClick}
    >
      {add ? (
        <IoAddOutline className="size-5" />
      ) : (
        <IoRemove className="size-5" />
      )}
    </button>
  );
};

export default function ProductQuantitySelector({ code }: Props) {
  const id = `product-${code}-qty`;

  const {
    selectedProductsQuantity,

    setQuantity,
  } = useStore();

  const [inputVal, setInputVal] = useState<string>(
    selectedProductsQuantity[code].toString(),
  );

  const handleBlurSetQuantityValue = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    const value = toPositiveNumber(e.target.value);

    let computedQuantity: number = value;
    if (computedQuantity > MAX_PRODUCT_QUANTITY) {
      computedQuantity = MAX_PRODUCT_QUANTITY;
    }
    if (computedQuantity <= 0) {
      computedQuantity = 1;
    }
    setQuantity(code, computedQuantity);
    setInputVal(computedQuantity.toString());
  };

  /**
   * Checks if the provided number does not exceed the max allowed quantity
   * number, or if it's inferior to the minimum allowed
   * @param n the number to check for validity
   * @returns Returns the same number if valid. Returns max allowed quantity if
   * the number exceeds the `MAX_PRODUCT_QUANTITY`. Returns 1 the
   * if it's below the minimum allowed.
   */
  const checkQuantityValidity = (n: number): number => {
    if (n > MAX_PRODUCT_QUANTITY) return MAX_PRODUCT_QUANTITY;

    if (n <= 0) return 1;

    return n;
  };

  const handleIncreaseQuantityClick = () => {
    const currentValue = selectedProductsQuantity[code];
    const computedValue = checkQuantityValidity(currentValue + 1);

    // prevent unnecessary rerender
    if (
      currentValue === computedValue &&
      computedValue === MAX_PRODUCT_QUANTITY
    )
      return;
    setQuantity(code, computedValue);
    setInputVal(computedValue.toString());
  };
  const handleDecreaseQuantityClick = () => {
    const currentValue = selectedProductsQuantity[code];
    const computedValue = checkQuantityValidity(currentValue - 1);

    // prevent unnecessary rerender if the value is already 1
    if (currentValue === computedValue && computedValue === 1) return;

    if (computedValue) setQuantity(code, computedValue);
    setInputVal(computedValue.toString());
  };

  return (
    <div className="flex h-8 w-full items-center justify-between">
      <label
        htmlFor={id}
        className="flex h-full grow items-center text-sm font-semibold"
      >
        Quantité
      </label>
      <div className="flex gap-1.5">
        <QuantityButton onClick={handleDecreaseQuantityClick} />
        <input
          id={id}
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value.trim())}
          onBlur={handleBlurSetQuantityValue}
          className="size-8 rounded-md border bg-neutral-200 text-center font-semibold outline-none ring-blue-500 [appearance:textfield] focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Qt"
          // autoFocus
          min={1}
          inputMode="numeric"
          pattern="[0-9]*"
          max={MAX_PRODUCT_QUANTITY}
        />
        <QuantityButton onClick={handleIncreaseQuantityClick} add />
      </div>
    </div>
  );
}
