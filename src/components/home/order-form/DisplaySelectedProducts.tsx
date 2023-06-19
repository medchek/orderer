"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import ProductDetails from "@/components/home/order-form/SelectedProductDetails";
import { MdAdd } from "react-icons/md";
import { createPortal } from "react-dom";
import AddProduct from "../AddProduct";
import AddProductButton from "../AddProductButton";

import { useSearchParams } from "next/navigation";
import { SHIPPING_TYPE } from "@/store/orderFormSlice";
import Loader from "@/components/Loader";

export default function DisplaySelectedProducts() {
  const searchParams = useSearchParams();

  const [isFetchingProduct, setIsFetchingProduct] = useState(false);

  useEffect(() => {
    // Av9UC7xfFIojuM0wSqyn
    // only search for the product when there none selected and the product code is supplied in the url
    if (selectedProducts.length === 0) {
      const productCode = searchParams.get("product");
      if (productCode) {
        setIsFetchingProduct(true);
        fetchSingleProduct(productCode)
          .catch((e) => {
            console.error("error searching single product in component", e);
          })
          .finally(() => {
            setIsFetchingProduct(false);
          });
      }
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    selectedProducts,
    removeProduct,
    selectedWilaya,
    shippingType,
    fetchSingleProduct,
  } = useStore((state) => state);

  const productList = !selectedProducts.length ? (
    <div className="relative w-full bg-[#F4F4F4] dark:bg-[#08080c] h-[154px] rounded-2xl flex flex-col items-center justify-center py-2 px-3 space-y-2 font-semibold overflow-hidden dark:text-stone-200">
      {isFetchingProduct ? (
        <Loader />
      ) : (
        <button
          className="relative w-full h-full rounded-2xl flex flex-col items-center justify-center py-2 px-3 space-y-2 font-semibold"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <p>Aucun produit n'a été selectionné pour livraison</p>
          <div className="font-semibold flex">
            <MdAdd className="h-6 w-6" />
            <p>Ajouter un produit</p>
          </div>
        </button>
      )}
    </div>
  ) : (
    selectedProducts.map((product, idx) => (
      <ProductDetails
        productCount={selectedProducts.length}
        onClear={() => removeProduct(idx)}
        name={product.name}
        description={product.description}
        price={product.price}
        images={product.images}
        key={idx}
        discount={product.discount}
      />
    ))
  );

  const productsPrice = () =>
    selectedProducts.reduce((prevVal, currentVal) => {
      const discountedPrice =
        currentVal.price - (currentVal.price * currentVal.discount) / 100;
      return prevVal + discountedPrice;
    }, 0);

  const shippingPrice =
    selectedWilaya === null // if no wilaya is selected, set the price to 0
      ? 0
      : shippingType === SHIPPING_TYPE.HOME
      ? selectedWilaya.homePrice
      : selectedWilaya.officePrice;

  const totalPrice = productsPrice() + shippingPrice;

  return (
    <section id="products-detail" className="w-full">
      <div className="flex justify-between w-full h-8 mb-2">
        <h1 className="text-2xl font-bold dark:text-white">Votre Commande</h1>
        {selectedProducts.length < 3 && (
          <AddProductButton onClick={() => setIsModalOpen(true)} />
        )}
        {isModalOpen &&
          createPortal(
            <AddProduct close={() => setIsModalOpen(false)} />,
            document.body
          )}
      </div>
      <div className="w-full flex space-x-3">{productList}</div>
      <div className="flex justify-end items-center h-14 text-stone-950 dark:text-white">
        <ul>
          <li className="flex justify-between space-x-7">
            <span>Prix de Livraison:</span>
            <span>{shippingPrice} DA</span>
          </li>
          <li className="flex justify-between space-x-7 font-semibold">
            <span>Prix Total:</span>
            <span>{totalPrice} DA</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
