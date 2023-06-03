"use client";

import React, { useState } from "react";
import TypeSelectorButton from "./TypeSelectorButton";
import Input from "./Input";

export default function ShippingTypeSelector() {
  const [isHome, setIsHome] = useState(true);
  const handleClick = (bool: boolean) => {
    if (isHome === bool) return;
    setIsHome(bool);
  };
  return (
    <div className="w-full space-y-4">
      <span className="flex flex-col space-y-1 w-full">
        <p className="text-lg font-semibold">Type de Livraison</p>
        <div className="flex h-12 space-x-4">
          <TypeSelectorButton
            text="À Domicile"
            isSelected={isHome}
            onClick={() => handleClick(true)}
          />
          <TypeSelectorButton
            text="Au Bureau de Livraison"
            isSelected={!isHome}
            onClick={() => handleClick(false)}
          />
        </div>
      </span>
      {isHome && (
        <Input
          label="Adresse de Livraison"
          placeholder="Votre adresse"
          type="text"
        />
      )}
    </div>
  );
}
