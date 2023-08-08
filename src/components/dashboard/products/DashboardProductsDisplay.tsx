"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useStore } from "@/store";
import ProductCard from "../../ProductCard";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import ModalLoader from "@/components/ModalLoader";
import ProductCardLoader from "@/components/ProductCardLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "@/lib/clientApiHelpers";
import dynamic from "next/dynamic";
import DashboardFetchError from "../DashboardFetchError";
import { TbPackage } from "react-icons/tb";

const DashboardUpdateProduct = dynamic(
  () => import("./DashboardUpdateProduct"),
  { loading: () => <ModalLoader /> }
);
const DashboardDeleteConfirm = dynamic(
  () => import("../DashboardDeleteConfirm"),
  { loading: () => <ModalLoader /> }
);

export default function DashboardProductsDisplay() {
  const {
    products,
    setIsAddProductOpen,
    setProducts,
    deleteProduct: removePorductByCode,
    showSnackbar,
  } = useStore();

  // product code to delete
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdateIndex, setProductToUpdateIndex] = useState<
    number | null
  >(null);

  const { status, refetch, data, isFetching, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    onSuccess: (products) => {
      // setProducts(products);
    },
  });

  const { mutate: deleteProductMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: (productCode: string) => {
      removePorductByCode(productCode);
      showSnackbar("Produit supprimé!", "success");
      // close the modal
      setProductToDelete(null);
    },
    onError: () => {
      showSnackbar(
        "Une Erreur est survenu lors la suppression du produit, veuillez réessayer!",
        "error"
      );
    },
  });

  // old btn style :  bg-[#E9E9E9] text-sm font-semibold hover:bg-[#e0e0e0] focus:bg-[#cacaca] dark:bg-[#292934] dark:text-white dark:hover:bg-[#3a3a49] dark:focus:bg-[#0e0e15]

  if (isFetching) {
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
  } else if (isError) {
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <DashboardFetchError
          text="Une érreur est survenu lors de la recherche des produits"
          refetch={refetch}
        />
      </div>
    );
  } else {
    return !data || !data.products.length ? (
      <div className="grow flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 -translate-y-20 text-stone-50">
          <TbPackage className="w-20 h-20" />
          <p>Aucun produit n'a été encore ajouté</p>
          <button
            type="button"
            className="px-2 h-10  rounded-lg font-semibold dark:hover:bg-stone-900 dark:focus:bg-stone-900/70 transition-colors"
            onClick={() => setIsAddProductOpen(true)}
          >
            <MdAdd className="w-7 h-7" /> Ajouter un produit
          </button>
        </div>
      </div>
    ) : (
      <section
        id="product-display"
        className="mr-6 grid w-full grow gap-5 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
      >
        {data.products.map(
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
            // productCode={productToDelete}
            closeModal={() => setProductToDelete(null)}
            label="Supprimer un produit"
            text="Êtes-vous sûr de vouloir supprimer ce produit?"
            onConfirm={() => deleteProductMutation(productToDelete)}
            isLoading={isDeleting}
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
