"use client";
import React from "react";
import { useStore } from "@/store";
import Product from "@/components/Product";
import { MdAdd } from "react-icons/md";

type Props = {};

export default function ProductDetails({}: Props) {
  const { products, removeProduct } = useStore((state) => state);

  const productList = products.map((product) => (
    <Product
      productCount={products.length}
      onClear={() => removeProduct(product.id)}
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
      <div className="flex justify-between w-full h-8 mb-2">
        <h1 className="text-2xl font-bold ">Votre Commande</h1>
        <button className="flex items-center space-x-1  px-1 rounded-lg text-[#171717] focus:bg-[#F4F4F4] transition-colors">
          <MdAdd className="h-6 w-6" />{" "}
          <span className="text-sm font-semibold">Ajouter un Produit</span>
        </button>
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
