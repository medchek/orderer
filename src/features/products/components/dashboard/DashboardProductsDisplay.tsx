"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store";

import {
  MdAdd,
  MdDeleteOutline,
  MdEdit,
  MdOutlineFilterAltOff,
} from "react-icons/md";
import ModalLoader from "@/components/ModalLoader";
import ProductCardLoader from "@/components/ProductCardLoader";

import dynamic from "next/dynamic";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import { TbPackage } from "react-icons/tb";
import { useDeleteProduct } from "../../api/deleteProduct";
import { useGetProducts } from "../../api/getProducts";
import ProductCard from "../ProductCard";
import DashboardPagination from "@/components/dashboard/DashboardPagination";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";

const DashboardAddProduct = dynamic(() => import("./DashboardAddProduct"), {
  loading: () => <ModalLoader />,
});

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
    isAddProductOpen,
    setIsAddProductOpen,
    showSnackbar,
    clipboard,
    setClipboard,
    productsFilters,
    resetProductsFilters,
    setProductsCurrentPage,
  } = useStore();

  const [hasFilters, setHasFilters] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPage: _, ...rest } = productsFilters;
    setHasFilters(!!Object.keys(rest).length);
  }, [productsFilters]);

  // product code to delete
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdateIndex, setProductToUpdateIndex] = useState<
    number | null
  >(null);

  const { refetch, data, status } = useGetProducts(productsFilters);
  const { mutate: deleteProductMutation, isPending: isDeleting } =
    useDeleteProduct({
      onSuccess: (/* productCode: string*/) => {
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

  const productsPerPage = 10;
  const pageCount = Math.ceil((data?.count ?? 0) / productsPerPage);

  const handlePageChange = (event: { selected: number }) => {
    const selected = event.selected;
    const currentPage = productsFilters.currentPage;
    if (selected === currentPage) return;
    setProductsCurrentPage(selected);
  };

  return (
    <div className="relative flex h-full w-full grow flex-col justify-between overflow-hidden">
      <div className="mr-6 grid w-full gap-2 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {/* ERROR  */}
        {status === "error" && (
          <DashboardFetchError
            text="Une érreur est survenu lors de la recherche des produits"
            refetch={refetch}
          />
        )}
        {/* LOADING */}
        {status === "pending" && (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardLoader key={i} />
            ))}
          </>
        )}
        {/* SUCCESS */}
        {status === "success" &&
          (!data || !data.products.length ? (
            //

            <DashboardEmptyState
              className="absolute"
              Icon={<TbPackage className="h-20 w-20" />}
              text={
                hasFilters
                  ? "Aucun produit ne correspond aux filtres appliqués"
                  : "Aucun produit n'a été encore ajouté"
              }
              subContent={
                <button
                  type="button"
                  className="flex h-10 items-center justify-center gap-1 rounded-lg px-2 font-semibold transition-colors dark:hover:bg-stone-900 dark:focus:bg-stone-900/70"
                  onClick={() => {
                    if (hasFilters) {
                      resetProductsFilters();
                    } else {
                      setIsAddProductOpen(true);
                    }
                  }}
                >
                  {hasFilters ? (
                    <MdOutlineFilterAltOff className="h-6 w-6" />
                  ) : (
                    <MdAdd className="h-7 w-7" />
                  )}
                  {hasFilters
                    ? "Réinitialiser les filtres"
                    : "Ajouter un produit"}
                </button>
              }
            />
          ) : (
            // empty data check end
            <>
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
                    <div className="flex w-full gap-2 text-sm font-semibold dark:text-stone-50">
                      <button
                        type="button"
                        className="h-8 grow gap-1 rounded-md bg-[#E9E9E9] transition-colors hover:bg-[#e0e0e0] focus:bg-[#cacaca] dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:bg-stone-900"
                        onClick={() => setProductToUpdateIndex(i)}
                      >
                        <MdEdit className="h-5 w-5" /> Modifier
                      </button>

                      <button
                        type="button"
                        className="h-8 w-8 rounded-md bg-[#E9E9E9] transition-colors hover:text-red-600 focus:bg-red-600 focus:text-white dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:bg-red-600"
                        onClick={() => setProductToDelete(code)}
                      >
                        <MdDeleteOutline className="h-5 w-5" />
                      </button>
                    </div>
                  </ProductCard>
                ),
              )}

              {productToDelete !== null && (
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

              {clipboard !== "" && (
                <CopyClipboardModal
                  closeModal={() => setClipboard("")}
                  label="Partager le produit"
                  text="Ce lien permet d'auto-sélectionner ce produit dans la page de
            la commande"
                />
              )}
            </>
          ))}
      </div>

      {/* out of condition renders */}
      {isAddProductOpen && (
        <DashboardAddProduct closeModal={() => setIsAddProductOpen(false)} />
      )}
      {data && data.products.length > 0 && (
        <DashboardPagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
