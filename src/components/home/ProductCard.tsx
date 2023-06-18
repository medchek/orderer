import { trucateString } from "@/lib/utils";
import { useStore } from "@/store";
import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  price: number;
  description: string;
  discount: number;
  images: { link: string }[];
  code: string;
  /** Executed when the product has been added */
  onAdd: () => void;
}

export default function ProductCard({
  name,
  description,
  price,
  discount,
  images,
  code,
  onAdd,
}: Props) {
  const { addSelectedProduct } = useStore();

  const handleAddProduct = () => {
    addSelectedProduct({
      name,
      code,
      description,
      discount,
      images,
      price,
    });
    // execute on add function (should be used to close the dialog)
    onAdd();
  };

  return (
    <div className="h-[440px] flex flex-col w-auto bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all shadow-blue-600 border border-stone-100">
      <div className="relative h-[210px] max-h-[210px] w-full bg-stone-200 pointer-events-none">
        <Image
          src={images[0].link}
          className="h-full object-cover object-center"
          alt="Product image"
          fill
          quality={50}
        />
        {/* discount */}
        {discount > 0 && (
          <span className="absolute bg-secondary w-16 h-6 flex items-center justify-center font-semibold text-white right-3 bottom-2 rounded-sm">
            -{discount}%
          </span>
        )}
      </div>
      <section className="w-full px-[10px] pb-2 grow flex flex-col justify-between">
        <div className="grow flex flex-col justify-between pt-1 pb-2">
          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-[#979797] text-sm">
              {trucateString(description, 50)}
            </p>
          </div>

          <p className="font-semibold">Prix: {price}DA</p>
        </div>

        <button
          className="flex items-center justify-center w-full h-7 bg-[#E9E9E9] focus:bg-secondary focus:text-white hover:bg-gray-300 rounded-md font-semibold transition-colors"
          onClick={handleAddProduct}
        >
          Ajouter
        </button>
      </section>
    </div>
  );
}
