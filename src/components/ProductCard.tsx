import React from "react";

type Props = {};

export default function ProductCard({}: Props) {
  return (
    <div className="h-[430px] flex flex-col w-auto bg-white rounded-lg overflow-hidden">
      <div className="relative h-[211px] max-h-[211px] w-full bg-stone-200 pointer-events-none">
        <span className="absolute bg-secondary w-16 h-6 flex items-center justify-center font-semibold text-white right-3 bottom-2 rounded-sm">
          -20%
        </span>
      </div>
      <section className="w-full px-[10px] pb-2 grow flex flex-col justify-between">
        <div className="grow flex flex-col justify-between pt-1 pb-2">
          <div>
            <p className="font-semibold text-lg">
              Apple Watch Series 8 Gps + Cellular 45mm
            </p>
            <p className="text-[#979797] text-sm">Couleur: Midnight</p>
          </div>

          <p className="font-semibold">Prix: 5000DA</p>
        </div>

        <button className="flex items-center justify-center w-full h-7 bg-[#E9E9E9] focus:bg-secondary focus:text-white hover:bg-gray-300 rounded-md font-semibold transition-colors">
          Ajouter
        </button>
      </section>
    </div>
  );
}
