"use client";
import React, { useEffect, useState } from "react";
import { MdChevronRight, MdClear, MdSearch } from "react-icons/md";
import ProductCard from "../ProductCard";
import { useStore } from "@/store";
import Loader from "../Loader";
import Modal from "../Modal";
import { Product } from "@/store/productSlice";

interface Props {
  closeModal: () => void;
}

export default function AddProduct({ closeModal }: Props) {
  const { products, fetchProducts, addSelectedProduct } = useStore();

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

  const handleAddProduct = (product: Product) => {
    addSelectedProduct(product);
    closeModal();
  };

  const productList = products.map((product) => {
    const { code, description, name, price, discount, images, stock } = product;
    return (
      <ProductCard
        name={name}
        key={code}
        description={description}
        price={price}
        discount={discount}
        images={images}
        stock={stock}
      >
        <button
          className="flex h-8 w-full items-center justify-center rounded-md bg-[#E9E9E9] font-semibold transition-colors hover:bg-gray-300 focus:bg-secondary 
          focus:text-white dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-[#0e0e15]"
          onClick={() => handleAddProduct(product)}
        >
          Ajouter
        </button>
      </ProductCard>
    );
  });
  return (
    <Modal
      className="flex h-full flex-col rounded-lg bg-[#F3F3F3]  px-10 py-5 shadow-md dark:bg-[#040404]"
      closeModal={closeModal}
    >
      <div id="dialog-header" className="flex grow-0 justify-between">
        <h1 className="text-xl font-semibold dark:text-white">
          Ajouter un Produit
        </h1>
        <button
          onClick={closeModal}
          className="flex h-7 w-7 items-center  justify-center rounded-md focus:bg-[#d4d4d4] dark:focus:bg-white/10"
        >
          <MdClear className="h-6 w-6 dark:text-gray-500" />
        </button>
      </div>

      <div
        id="select-category-container"
        className="relative my-5 flex h-12 max-h-12 min-h-[3rem] grow items-center"
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
          className="h-full w-full appearance-none rounded-lg pl-4 pr-4 outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-[#979797]"
          defaultValue={"prompt"}
        >
          <option value="prompt" hidden disabled>
            Selectionner une categorie
          </option>
          {/* temp */}

          <option value="1">Tout Afficher</option>
          <option value="2">Montres</option>
          <option value="3">Cameras</option>
        </select>
        <MdChevronRight className="pointer-events-none absolute right-4 h-7 w-7 rotate-90 text-stone-800 dark:text-[#979797]" />
      </div>

      {isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-8 w-8 border-4 border-stone-400" />
        </div>
      ) : (
        <section
          id="product-search-result"
          className="grid grow grid-cols-4 justify-end gap-8 overflow-y-auto dark:[color-scheme:dark]"
        >
          {productList}
        </section>
      )}
    </Modal>
  );
}
