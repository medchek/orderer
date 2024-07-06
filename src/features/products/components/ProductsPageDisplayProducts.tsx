"use client";
import { Fragment, useEffect, useState } from "react";
import { useGetProducts } from "../api/getProducts";
import { useStore } from "@/store";
import ProductCardLoader from "@/components/ProductCardLoader";
import ProductCard from "./ProductCard";
import FetchError from "@/components/dashboard/DashboardFetchError";
import Pagination from "@/components/Pagination";
import ProductCardButton from "@/features/products/components/ProductCardButton";
import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductsDisplayEmptyState from "./ProductsDisplayEmptyState";

/**
 * Component used to display paginated products list in products/page.tsx
 *
 */
export default function ProductsPageDisplayProducts() {
  const { productsFilters, selectedProducts } = useStore();

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
      return <ProductsDisplayEmptyState className="absolute pb-52" />;
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
