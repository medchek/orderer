"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useStore } from "@/store";
import ProductCard from "../../ProductCard";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import ModalLoader from "@/components/ModalLoader";
import ProductCardLoader from "@/components/ProductCardLoader";
import { useQuery } from "react-query";
import { getProducts } from "@/lib/clientApiHelpers";
import dynamic from "next/dynamic";

const DashboardUpdateProduct = dynamic(
  () => import("./DashboardUpdateProduct"),
  {
    loading: () => <ModalLoader />,
  }
);
const DashboardDeleteConfirm = dynamic(
  () => import("../DashboardDeleteConfirm"),
  {
    loading: () => <ModalLoader />,
  }
);

export default function DashboardProductsDisplay() {
  const { products, setIsAddProductOpen, setProducts } = useStore();
  // product code to delete
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdateIndex, setProductToUpdateIndex] = useState<
    number | null
  >(null);

  const { status, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: products.length === 0,
    onSuccess: (products) => {
      setProducts(products);
    },
  });

  // old btn style :  bg-[#E9E9E9] text-sm font-semibold hover:bg-[#e0e0e0] focus:bg-[#cacaca] dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-[#0e0e15]

  if (status === "loading") {
    return (
      <section
        id="product-display"
        className="mr-6 grid w-full grow gap-5 overflow-hidden pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <ProductCardLoader key={i} />
        ))}
      </section>
    );
  } else if (status === "error") {
    return (
      <div className="flex w-full grow flex-col items-center gap-2">
        <p className="mt-2 text-red-500">
          Une érreur est survenu lors de la recherche des produits
        </p>
        <button
          type="button"
          className="h-10 w-28 rounded-lg  font-semibold text-red-500 transition-colors hover:bg-red-800 hover:text-red-50 focus:bg-red-950 focus:text-white"
          onClick={() => refetch()}
        >
          Réessayer
        </button>
      </div>
    );
  } else {
    return !products.length ? (
      <section className=" flex w-full grow items-center flex-col dark:text-stone-100 gap-2">
        <p className="mt-2">Aucun produit n'a été ajouté</p>
        <button
          type="button"
          className="font-semibold focus:dark:bg-stone-900 px-3 rounded-lg h-9"
          onClick={() => setIsAddProductOpen(true)}
        >
          <MdAdd className="w-6 h-6" /> Ajouter
        </button>
      </section>
    ) : (
      <section
        id="product-display"
        className="mr-6 grid w-full grow gap-5 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
      >
        {products.map(
          ({ name, code, description, discount, images, price, stock }, i) => (
            <ProductCard
              name={name}
              description={description}
              discount={discount}
              images={images}
              price={price}
              stock={stock}
              key={code}
            >
              <div className="flex gap-2 dark:text-stone-50 text-sm font-semibold ">
                <button
                  type="button"
                  className="h-8 grow  gap-1 rounded-md bg-[#E9E9E9] hover:bg-[#e0e0e0] focus:bg-[#cacaca] dark:bg-stone-800  dark:hover:bg-stone-700 dark:focus:bg-stone-900 transition-colors"
                  onClick={() => setProductToUpdateIndex(i)}
                >
                  <MdEdit className="h-5 w-5" /> Modifier
                </button>
                <button
                  type="button"
                  className=" h-8 w-8  rounded-md bg-[#E9E9E9] transition-colors hover:text-red-600 focus:bg-red-600 focus:text-white dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:bg-red-600 "
                  onClick={() => setProductToDelete(code)}
                >
                  <MdDeleteOutline className="h-5 w-5" />
                </button>
              </div>
            </ProductCard>
          )
        )}

        {productToDelete && (
          <DashboardDeleteConfirm
            productCode={productToDelete}
            closeModal={() => setProductToDelete(null)}
          />
        )}

        {productToUpdateIndex !== null && (
          <DashboardUpdateProduct
            productIndex={productToUpdateIndex}
            closeModal={() => setProductToUpdateIndex(null)}
          />
        )}
      </section>
    );
  }
}
