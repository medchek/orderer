import Main from "@/components/Main";
import FilterDrawer from "@/components/filter/FilterDrawer";
import HomeHeader from "@/components/home/HomeHeader";
import { getProducts } from "@/features/products/api/getProducts";
import ProductsPageDisplayProducts from "@/features/products/components/ProductsPageDisplayProducts";
import { ProductsFilters } from "@/features/products/types";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/reactQuery";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function ProductsPage() {
  const filters: ProductsFilters = {
    currentPage: 0,
  };

  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.all(filters).queryKey,
    queryFn: () => getProducts(filters),
  });

  return (
    <Main className="max-h-v max-h-screen overflow-y-hidden">
      <HomeHeader />
      <div
        id="browse-products"
        className="relative flex w-full grow flex-col overflow-y-hidden lg:mb-2"
      >
        <section className="mb-4 flex h-10 w-full items-center justify-between lg:mb-2">
          <h1 className="text-xl font-semibold dark:text-white lg:text-2xl">
            Produits
          </h1>
          <FilterDrawer />
        </section>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductsPageDisplayProducts />
        </HydrationBoundary>
      </div>
    </Main>
  );
}
