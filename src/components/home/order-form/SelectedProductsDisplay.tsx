"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import ProductDetails from "@/components/home/order-form/SelectedProductDetails";
import { MdAdd } from "react-icons/md";
import AddProduct from "../AddProduct";
import AddProductButton from "../AddProductButton";
import { useQuery } from "react-query";

import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { getSingleProduct } from "@/lib/clientApiHelpers";

export default function SelectedProductsDisplay() {
  const searchParams = useSearchParams();
  const {
    selectedProducts,
    removeSelectedProduct,
    addSelectedProduct,
    isConfirming,
  } = useStore((state) => state);

  // const [isFetchingProduct, setIsFetchingProduct] = useState(false);

  const { status } = useQuery({
    queryKey: ["products", searchParams.get("product")],
    queryFn: ({ queryKey }) => getSingleProduct(queryKey),
    enabled: !!searchParams.get("product") && !selectedProducts.length,
    onSuccess(data) {
      addSelectedProduct(data);
    },
    cacheTime: 1000 * 60 * 10,
  });

  // useEffect(() => {
  //   // qp9EMKmCxHDkXkkj3heb
  //   // only search for the product when there none selected and the product code is supplied in the url
  //   if (selectedProducts.length === 0) {
  //     const productCode = searchParams.get("product");
  //     if (productCode) {
  //       setIsFetchingProduct(true);
  //       fetchSingleProduct(productCode)
  //         .catch((e) => {
  //           console.error("error searching single product in component", e);
  //         })
  //         .finally(() => {
  //           setIsFetchingProduct(false);
  //         });
  //     }
  //   }
  // }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const productList = !selectedProducts.length ? (
    <div className="relative flex h-[154px] w-full flex-col items-center justify-center space-y-2 overflow-hidden rounded-2xl bg-[#F4F4F4] px-3 py-2 font-semibold dark:bg-input-dark dark:text-stone-200">
      {status === "loading" ? (
        <Loader />
      ) : (
        <button
          className="relative flex h-full w-full flex-col items-center justify-center space-y-2 rounded-2xl px-3 py-2 font-semibold"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <p>Aucun produit n'a été selectionné pour livraison</p>
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
        productCount={selectedProducts.length}
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
    <section id="products-detail" className="mb-2 w-full">
      <div className="mb-2 flex h-8 w-full justify-between">
        <h1 className="text-xl font-bold dark:text-white">Votre Commande</h1>
        {selectedProducts.length < 3 && !isConfirming && (
          <AddProductButton onClick={() => setIsModalOpen(true)} />
        )}
        {isModalOpen && <AddProduct closeModal={() => setIsModalOpen(false)} />}
      </div>
      <div className="flex w-full space-x-3">{productList}</div>
      <div className="flex items-center justify-end pt-1 text-sm text-stone-950 dark:text-stone-500">
        {/* <Prices /> */}Produits sélectionnés {selectedProducts.length} (3
        Maximum)
      </div>
    </section>
  );
}
