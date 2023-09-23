"use client";
import { useState } from "react";
import { useStore } from "@/store";

import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import ModalLoader from "@/components/ModalLoader";
import ProductCardLoader from "@/components/ProductCardLoader";

import dynamic from "next/dynamic";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import { TbPackage } from "react-icons/tb";
import { useDeleteProduct } from "../../api/deleteProduct";
import { useGetProducts } from "../../api/getProducts";
import ProductCard from "../ProductCard";

const DashboardUpdateProduct = dynamic(
  () => import("./DashboardUpdateProduct"),
  // () => import("@/components/Modal"),
  { loading: () => <ModalLoader /> },
);
const DashboardDeleteConfirm = dynamic(
  () => import("@/components/dashboard/DashboardDeleteConfirm"),
  { loading: () => <ModalLoader /> },
);

const CopyClipboardModal = dynamic(
  () => import("@/components/CopyClipboardModal"),
  { loading: () => <ModalLoader /> },
);
export default function DashboardProductsDisplay() {
  const {
    setIsAddProductOpen,

    deleteProduct: removePorductByCode,
    showSnackbar,
    clipboard,
    setClipboard,
  } = useStore();

  // product code to delete
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdateIndex, setProductToUpdateIndex] = useState<
    number | null
  >(null);

  const { refetch, data, isFetching, isError } = useGetProducts();

  const { mutate: deleteProductMutation, isLoading: isDeleting } =
    useDeleteProduct({
      onSuccess: (productCode: string) => {
        removePorductByCode(productCode);
        showSnackbar("Produit supprimé!", "success");
        // close the modal
        setProductToDelete(null);
      },
      onError: () => {
        showSnackbar(
          "Une Erreur est survenu lors la suppression du produit, veuillez réessayer!",
          "error",
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
      <div className="relative flex h-full w-full items-center justify-center">
        <DashboardFetchError
          text="Une érreur est survenu lors de la recherche des produits"
          refetch={refetch}
        />
      </div>
    );
  } else {
    return !data || !data.products.length ? (
      <div className="flex grow items-center justify-center">
        <div className="flex -translate-y-20 flex-col items-center gap-2 text-stone-50">
          <TbPackage className="h-20 w-20" />
          <p>Aucun produit n&apos;a été encore ajouté</p>
          <button
            type="button"
            className="h-10 rounded-lg  px-2 font-semibold transition-colors dark:hover:bg-stone-900 dark:focus:bg-stone-900/70"
            onClick={() => setIsAddProductOpen(true)}
          >
            <MdAdd className="h-7 w-7" /> Ajouter un produit
          </button>
        </div>
      </div>
    ) : (
      <section
        id="product-display"
        className="mr-6 grid w-full grow gap-5 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
      >
        {data.products.map(
          (
            {
              name,
              code,
              description,
              discount,
              images,
              price,
              stock,
              category,
              subCategory,
            },
            i,
          ) => (
            <ProductCard
              name={name}
              description={description}
              discount={discount}
              images={images}
              price={price}
              stock={stock}
              category={category?.name}
              subcategory={subCategory?.name}
              isDashboard={true}
              code={code}
              key={code}
            >
              <div className="flex gap-2 text-sm font-semibold dark:text-stone-50 ">
                <button
                  type="button"
                  className="h-8 grow  gap-1 rounded-md bg-[#E9E9E9] transition-colors hover:bg-[#e0e0e0] focus:bg-[#cacaca]  dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:bg-stone-900"
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
          ),
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
            // productIndex={productToUpdateIndex}
            closeModal={() => setProductToUpdateIndex(null)}
            productIndex={productToUpdateIndex}
          />
        )}

        {clipboard.length && (
          <CopyClipboardModal
            closeModal={() => setClipboard("")}
            label="Partager le produit"
            text="Ce lien permet d'auto-sélectionner ce produit dans la page de
            la commande"
          />
        )}
      </section>
    );
  }
}
