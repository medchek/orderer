"use client";
import React from "react";
import { useStore } from "@/store";
import Product from "@/components/Product";

type Props = {};

export default function ProductDetails({}: Props) {
  const products = useStore((state) => state.products);

  const productList = products.map((product) => (
    <Product
      name={product.name}
      description={product.description}
      price={product.price}
      key={product.id}
    />
  ));

  const productsPrice = () =>
    products.reduce((prevVal, currentVal) => prevVal + currentVal.price, 0);

  const shippingPrice = 400;

  const totalPrice = productsPrice() + shippingPrice;

  return (
    <section id="products-detail" className="w-full">
      <h1 className="text-2xl font-bold mb-2">Votre Commande</h1>
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
