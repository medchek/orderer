"use client";
import React, { useEffect, useState } from "react";
import { MdChevronRight, MdClear, MdSearch } from "react-icons/md";
import ProductCard from "./ProductCard";
import { useStore } from "@/store";
import Loader from "./Loader";

interface Props {
  close: () => void;
}

export default function AddProduct({ close }: Props) {
  const { products, fetchProducts } = useStore();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      setIsFetching(true);
      fetchProducts()
        .catch((err) => console.log(err))
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, []);

  const productList = products.map(
    ({ code, description, name, price, discount, images }) => (
      <ProductCard
        name={name}
        key={code}
        description={description}
        price={price}
        discount={discount}
        images={images}
        code={code}
        onAdd={() => close()}
      />
    )
  );

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
          {/* <MdSearch className="absolute h-6 w-6 left-4 text-[#979797]" />

          <input
            type="search"
            name="search"
            id="search-input"
            className="w-full h-full pl-12 pr-4 rounded-lg outline-secondary placeholder-[#979797]"
            placeholder="Chercher un Produit"
            autoComplete="off"
          /> */}
          <select
            name="category"
            id="category-selector"
            className="w-full h-full pl-4 pr-4 rounded-lg outline-secondary placeholder-[#979797] appearance-none"
          >
            <option value="all" hidden disabled>
              Selectionner une categorie
            </option>
            {/* temp */}
            <option value="all">Montres</option>
            <option value="all">Cameras</option>
          </select>
          <MdChevronRight className="absolute right-4 rotate-90 w-7 h-7 pointer-events-none text-stone-800" />
        </div>

        {isFetching ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader className="w-8 h-8 border-4 border-stone-400" />
          </div>
        ) : (
          <section
            id="product-search-result"
            className="grow grid grid-cols-4 gap-8 overflow-y-auto justify-end"
          >
            {productList}
          </section>
        )}
      </section>
    </div>
  );
}
