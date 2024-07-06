"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { MdAdd } from "react-icons/md";

import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetSingleProduct } from "@/features/products/api/getSingleProduct";
import dynamic from "next/dynamic";
import ModalLoader from "@/components/ModalLoader";
import clsx from "clsx";
import { useSelectedProductsCount } from "@/features/products/hooks/useSelectedProductsCount";
import ProductsDisplaySelectedProductsCount from "@/features/products/components/ProductsDisplaySelectedProductsCount";
import SelectedProductDetails from "@/features/products/components/SelectedProductDetails";

const AddProduct = dynamic(() => import("../AddProduct"), {
  loading: () => <ModalLoader />,
});

/**
 * Displays the selected products on top of the order form
 */
export default function OrderFromDisplaySelectedProducts() {
  const productCode = useSearchParams().get("product")?.trim();
  const {
    selectedProducts,
    selectedProductsQuantity,
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

  const displaySelectedProducts = Object.keys(selectedProducts).map(
    (productCodeKey) => {
      const product = selectedProducts[productCodeKey];
      return (
        <SelectedProductDetails
          quantity={selectedProductsQuantity[productCodeKey]}
          onClear={() => removeSelectedProduct(productCodeKey)}
          name={product.name}
          description={product.description}
          price={product.price}
          images={product.images}
          key={productCodeKey}
          code={productCodeKey}
          discount={product.discount}
          disabledRemove={isConfirming}
        />
      );
    },
  );

  const selectedProductsCount = useSelectedProductsCount();
  const productList = !selectedProductsCount ? (
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
    displaySelectedProducts
  );

  return (
    <section id="products-detail" className="w-full lg:mb-2">
      <div className="mb-2 flex h-5 w-full justify-between lg:h-8">
        <h1 className="text-base font-semibold dark:text-white lg:text-xl">
          Votre Commande
        </h1>
        {
          /* selectedProductsCount < 3 && */ !isConfirming && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex h-6 items-center space-x-0.5 rounded-md px-1 text-neutral-800 transition-colors hover:text-[#535353] focus:bg-[#F4F4F4] dark:text-neutral-300 dark:hover:text-white dark:focus:bg-neutral-800"
            >
              <MdAdd className="h-6 w-6" />
              <span className="text-sm font-semibold">Ajouter un Produit</span>
            </button>
          )
        }
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
              "w-max lg:w-full": selectedProductsCount > 1,
              "w-full": selectedProductsCount <= 1,
            })}
          >
            {productList}
          </div>
        </div>
      </div>
      <ProductsDisplaySelectedProductsCount />
    </section>
  );
}
