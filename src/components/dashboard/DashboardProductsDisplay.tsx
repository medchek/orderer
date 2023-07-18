"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useStore } from "@/store";
import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import DashboardUpdateProduct from "./DashboardUpdateProduct";
import ModalLoader from "../ModalLoader";
import ProductCardLoader from "../ProductCardLoader";
const DashboardDeleteConfirm = React.lazy(
  () => import("./DashboardDeleteConfirm")
);

export default function DashboardProductsDisplay() {
  const {
    products,
    fetchProducts,
    hasFetchedAllProducts,
    productsFetchStatus,
  } = useStore();
  // product code to delete
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdateIndex, setProductToUpdateIndex] = useState<
    number | null
  >(null);
  useEffect(() => {
    if (productsFetchStatus !== "success") {
      fetchProducts();
    }
  }, []);

  return productsFetchStatus === "fetching" ||
    productsFetchStatus === "init" ? (
    // <div className="flex w-full grow items-center justify-center">
    //   <Loader className="h-8 w-8" />
    // </div>
    <section
      id="product-display"
      className="mr-6 grid w-full grow gap-5 overflow-hidden pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <ProductCardLoader key={i} />
      ))}
    </section>
  ) : productsFetchStatus === "error" ? (
    <div className="flex w-full grow flex-col items-center gap-2">
      <p className="mt-2 text-red-500">
        Une érreur est survenu lors de la recherche des produits
      </p>
      <button
        type="button"
        className="h-10 w-28 rounded-lg  font-semibold text-red-500 transition-colors hover:bg-red-800 hover:text-red-50 focus:bg-red-950 focus:text-white"
        onClick={fetchProducts}
      >
        Réessayer
      </button>
    </div>
  ) : productsFetchStatus === "success" ? (
    !products.length ? (
      <section className=" flex w-full grow  justify-center dark:text-white">
        <p className="mt-2">Aucun produit n'a été ajouté</p>
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
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-8 grow items-center justify-center gap-1 rounded-md bg-[#E9E9E9] text-sm font-semibold hover:bg-[#e0e0e0] focus:bg-[#cacaca] dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-[#0e0e15]"
                  onClick={() => setProductToUpdateIndex(i)}
                >
                  <MdEdit className="h-5 w-5" /> Modifier
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E9E9E9] transition-colors hover:text-red-600 focus:bg-red-600 focus:text-white dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-red-600 "
                  onClick={() => setProductToDelete(code)}
                >
                  <MdDeleteOutline className="h-5 w-5" />
                </button>
              </div>
            </ProductCard>
          )
        )}

        <Suspense fallback={<ModalLoader />}>
          {productToDelete && (
            <DashboardDeleteConfirm
              productCode={productToDelete}
              closeModal={() => setProductToDelete(null)}
            />
          )}
        </Suspense>

        <Suspense fallback={<ModalLoader />}>
          {productToUpdateIndex !== null && (
            <DashboardUpdateProduct
              productIndex={productToUpdateIndex}
              closeModal={() => setProductToUpdateIndex(null)}
            />
          )}
        </Suspense>
      </section>
    )
  ) : null;
}
