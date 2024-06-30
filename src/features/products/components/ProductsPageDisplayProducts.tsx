"use client";
import { Fragment, useEffect, useState } from "react";
import { useGetProducts } from "../api/getProducts";
import { useStore } from "@/store";
import ProductCardLoader from "@/components/ProductCardLoader";
import ProductCard from "./ProductCard";
import FetchError from "@/components/dashboard/DashboardFetchError";
import EmptyState from "@/components/dashboard/DashboardEmptyState";
import Pagination from "@/components/Pagination";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { TbPackage } from "react-icons/tb";
import useProductFilter from "../hooks/useProductFilter";
import ProductCardButton from "@/features/products/components/ProductCardButton";
import ProductQuantitySelector from "./ProductQuantitySelector";

/**
 * Component used to display paginated products list in products/page.tsx
 *
 */
export default function ProductsPageDisplayProducts() {
  const { productsFilters, selectedProducts } = useStore();
  const { resetFilters } = useProductFilter();

  const [hasFilters, setHasFilters] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPage: _, ...rest } = productsFilters;
    setHasFilters(!!Object.keys(rest).length);
  }, [productsFilters]);

  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data, isFetching, isError, refetch } =
    useGetProducts(productsFilters);

  const displayProducts = () => {
    // fetching state
    if (isFetching) {
      return Array.from({ length: 10 }, (_, i) => (
        <ProductCardLoader key={i} />
      ));
    }
    // Error state
    if (isError && !isFetching) {
      return <FetchError refetch={refetch} />;
    }
    // Empty data state
    if (!data || data.count === 0) {
      return (
        <EmptyState
          className="absolute pb-24"
          noTranslate
          Icon={<TbPackage className="size-20" />}
          text={
            hasFilters
              ? "Aucun produit ne correspond aux filtres appliqués"
              : "Aucun produit n'a été encore ajouté"
          }
          subContent={
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-1 rounded-lg px-2 font-semibold transition-colors dark:hover:bg-stone-900 dark:focus:bg-stone-900/70"
              onClick={resetFilters}
            >
              {hasFilters ? (
                <MdOutlineFilterAltOff className="h-6 w-6" />
              ) : null}
              {hasFilters ? "Réinitialiser les filtres" : null}
            </button>
          }
        />
      );
    }

    // success state

    return data.products.map((product) => {
      const { category, subCategory, ...productData } = product;
      const isProductSelected = selectedProducts[product.code] !== undefined;
      return (
        <ProductCard
          isSelected={isProductSelected}
          key={product.code}
          {...productData}
          category={category?.name}
          subcategory={subCategory?.name}
        >
          <div className="flex w-full flex-col gap-2">
            {isProductSelected ? (
              <ProductQuantitySelector code={product.code} />
            ) : null}
            <ProductCardButton
              isSelected={isProductSelected}
              className="h-9 min-h-9"
              product={product}
            />
          </div>
        </ProductCard>
      );
    });
  };

  // pagination calculations
  const productsPerPage = 8;
  const [pageCount, setPageCount] = useState(
    Math.ceil((data?.count ?? 0) / productsPerPage),
  );

  useEffect(() => {
    setPageCount(Math.ceil((data?.count ?? 0) / productsPerPage));
  }, [data?.count]);

  return (
    <Fragment>
      <section className="grow flex-col overflow-y-auto">
        <div className="grid h-full grid-cols-1 justify-end gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {displayProducts()}
        </div>
      </section>

      <Pagination pageCount={pageCount} renderOnZeroPageCount={null} />
    </Fragment>
  );
}
