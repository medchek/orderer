"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import ProductDetails from "@/components/home/order-form/SelectedProductDetails";
import { MdAdd } from "react-icons/md";

import AddProductButton from "../AddProductButton";

import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetSingleProduct } from "@/features/products/api/getSingleProduct";
import dynamic from "next/dynamic";
import ModalLoader from "@/components/ModalLoader";
import clsx from "clsx";

const AddProduct = dynamic(() => import("../AddProduct"), {
  loading: () => <ModalLoader />,
});

export default function SelectedProductsDisplay() {
  const productCode = useSearchParams().get("product")?.trim();
  const {
    selectedProducts,
    removeSelectedProduct,
    addSelectedProduct,
    isConfirming,
  } = useStore((state) => state);

  const { isFetching, data: fetchedProduct } = useGetSingleProduct(
    productCode ?? "",
    {
      enabled: productCode !== undefined && productCode !== "",
    },
  );

  useEffect(() => {
    if (fetchedProduct) {
      addSelectedProduct(fetchedProduct);
    }
  }, [fetchedProduct, addSelectedProduct]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const productList = !selectedProducts.length ? (
    <div className="relative flex h-[154px] w-full flex-col items-center justify-center space-y-2 overflow-hidden rounded-2xl bg-neutral-200 px-3 py-2 text-sm font-semibold dark:bg-neutral-900 dark:text-neutral-200 lg:text-base">
      {isFetching ? (
        <Loader />
      ) : (
        <button
          className="relative flex h-full w-full flex-col items-center justify-center space-y-2 rounded-2xl px-3 py-2 font-semibold"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <p>Aucun produit n&apos;a été selectionné pour livraison</p>
          <span className="flex font-semibold">
            <MdAdd className="h-6 w-6" />
            <span>Ajouter un produit</span>
          </span>
        </button>
      )}
    </div>
  ) : (
    selectedProducts.map((product, idx) => (
      <ProductDetails
        onClear={() => removeSelectedProduct(idx)}
        name={product.name}
        description={product.description}
        price={product.price}
        images={product.images}
        key={idx}
        discount={product.discount}
        disabledRemove={isConfirming}
      />
    ))
  );

  return (
    <section id="products-detail" className="w-full  lg:mb-2">
      <div className="mb-2 flex h-5 w-full justify-between lg:h-8">
        <h1 className="text-base font-semibold dark:text-white lg:text-xl">
          Votre Commande
        </h1>
        {selectedProducts.length < 3 && !isConfirming && (
          <AddProductButton onClick={() => setIsModalOpen(true)} />
        )}
        {isModalOpen && <AddProduct closeModal={() => setIsModalOpen(false)} />}
      </div>
      <div
        className={clsx("overflow-hidden", {
          // "-mr-4 lg:mr-0": selectedProducts.length > 1,
        })}
      >
        <div className="h-full w-full overflow-x-auto">
          <div
            className={clsx("flex gap-3 overflow-auto", {
              "w-max lg:w-full": selectedProducts.length > 1,
              "w-full": selectedProducts.length <= 1,
            })}
          >
            {productList}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end pt-1 text-xs text-neutral-600 dark:text-neutral-500 lg:text-sm">
        sélectionnés {selectedProducts.length} (3 Maximum)
      </div>
    </section>
  );
}
