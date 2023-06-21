"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/store";
import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

export default function DashboardProductsDisplay() {
  const { products, fetchProducts, hasFetchedAllProducts } = useStore();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);

  useEffect(() => {
    console.log(products.length, hasFetchedAllProducts);
    if (products.length === 0 && !hasFetchedAllProducts) {
      setFetchingError(false);
      setIsFetching(true);
      fetchProducts()
        .then()
        .catch((e) => {
          setFetchingError(true);
          console.error(
            "Error fetching all products in dashboard component",
            e
          );
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, []);

  return isFetching ? (
    <div className="flex w-full grow items-center justify-center">
      <Loader className="h-8 w-8 border-primary dark:border-[#14163b]" />
    </div>
  ) : (
    <section
      id="product-display"
      className="grid w-full grow gap-5 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
    >
      {products.map(
        ({ name, code, description, discount, images, price, stock }) => (
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
              >
                <MdEdit className="h-5 w-5" /> Modifier
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E9E9E9] transition-colors hover:text-red-600 focus:bg-red-600 focus:text-white dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-red-600 "
              >
                <MdDeleteOutline className="h-5 w-5" />
              </button>
            </div>
          </ProductCard>
        )
      )}
    </section>
  );
}
