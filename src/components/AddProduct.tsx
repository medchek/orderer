import React from "react";
import { MdClear, MdSearch } from "react-icons/md";
import ProductCard from "./ProductCard";

interface Props {
  close: () => void;
}

export default function AddProduct({ close }: Props) {
  return (
    <div
      id="dialog"
      className="absolute z-10 w-screen h-screen bg-gray-950/50 top-0 left-0 px-10 2xl:px-72 py-10"
    >
      <section className="flex flex-col h-full bg-[#F3F3F3] px-10 py-5 rounded-lg shadow-md">
        <div id="dialog-header" className="flex justify-between grow-0">
          <h1 className="text-xl font-semibold">Ajouter un Produit</h1>
          <button
            onClick={close}
            className="flex items-center justify-center h-7 w-7 focus:bg-[#d4d4d4] rounded-md"
          >
            <MdClear className="h-6 w-6" />
          </button>
        </div>

        <div
          id="search-input-container"
          className="relative flex items-center min-h-12 h-12 max-h-12 my-5 grow"
        >
          <MdSearch className="absolute h-6 w-6 left-4 text-[#979797]" />

          <input
            type="search"
            name="search"
            id="search-input"
            className="w-full h-full pl-12 pr-4 rounded-lg outline-secondary placeholder-[#979797]"
            placeholder="Chercher un Produit"
            autoComplete="off"
          />
        </div>

        <section
          id="product-search-result"
          className="grow grid grid-cols-4 gap-8 overflow-y-auto justify-end"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          {/* <ProductCard /> */}
        </section>
      </section>
    </div>
  );
}
