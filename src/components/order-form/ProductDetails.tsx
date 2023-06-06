"use client";
import React, { useState } from "react";
import { useStore } from "@/store";
import Product from "@/components/order-form/Product";
import { MdAdd } from "react-icons/md";
import { createPortal } from "react-dom";
import AddProduct from "../AddProduct";
import AddProductButton from "../AddProductButton";

type Props = {};

export default function ProductDetails({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, removeProduct } = useStore((state) => state);

  const productList = !products.length ? (
    <div className="relative w-full bg-[#F4F4F4] h-[154px] rounded-2xl flex flex-col items-center justify-center py-2 px-3 space-y-2 font-semibold">
      <p>Aucun produit n'a été selectionné pour livraison</p>
      <AddProductButton onClick={() => setIsModalOpen(true)} />
    </div>
  ) : (
    products.map((product) => (
      <Product
        productCount={products.length}
        onClear={() => removeProduct(product.id)}
        name={product.name}
        description={product.description}
        price={product.price}
        key={product.id}
      />
    ))
  );

  const productsPrice = () =>
    products.reduce((prevVal, currentVal) => prevVal + currentVal.price, 0);

  const shippingPrice = 400;

  const totalPrice = productsPrice() + shippingPrice;

  return (
    <section id="products-detail" className="w-full">
      <div className="flex justify-between w-full h-8 mb-2">
        <h1 className="text-2xl font-bold ">Votre Commande</h1>
        <AddProductButton onClick={() => setIsModalOpen(true)} />
        {isModalOpen &&
          createPortal(
            <AddProduct close={() => setIsModalOpen(false)} />,
            document.body
          )}
      </div>
      <div className="w-full flex space-x-3">{productList}</div>
      <div className="flex justify-end items-center h-14">
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
