"use client";
import { useStore } from "@/store";
import Modal from "../Modal";
import { useGetProducts } from "@/features/products/api/getProducts";
import ProductCard from "@/features/products/components/ProductCard";
import DashboardFetchError from "../dashboard/DashboardFetchError";
import ProductCardLoader from "../ProductCardLoader";
import Pagination from "../Pagination";
import ProductQuantitySelector from "@/features/products/components/ProductQuantitySelector";
import ProductCardButton from "@/features/products/components/ProductCardButton";
import Button from "../Button";
import FilterDrawer from "../filter/FilterDrawer";
import ProductsDisplayEmptyState from "@/features/products/components/ProductsDisplayEmptyState";

interface Props {
  closeModal: () => void;
}

export default function AddProduct({ closeModal }: Props) {
  const {
    // addSelectedProduct,
    productsFilters,
    setProductsCurrentPage,
    selectedProducts,
  } = useStore();

  const { data, isFetching, isSuccess, isError, refetch } =
    useGetProducts(productsFilters);

  // const handleAddProduct = (product: Product) => {
  //   addSelectedProduct(product);
  //   closeModal();
  // };

  const productsPerPage = 10;
  const pageCount = Math.ceil((data?.count ?? 0) / productsPerPage);

  const handlePageChange = (event: { selected: number }) => {
    const selected = event.selected;
    const currentPage = productsFilters.currentPage;
    if (selected === currentPage) return;
    setProductsCurrentPage(selected);
  };

  const productList = () => {
    if (!data || data.products.length === 0) {
      return <ProductsDisplayEmptyState />;
    }

    return data?.products.map((product) => {
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

  return (
    <Modal
      className="flex h-full flex-col rounded-lg pb-0 shadow-md lg:pb-0 lg:pt-4"
      closeModal={closeModal}
      label="Ajouter un Produit"
      closeOnClickOutside
      overlayClassName="py-3"
    >
      <div
        id="select-category-container"
        className="relative my-1 flex h-12 max-h-12 min-h-[3rem] grow items-center justify-end lg:my-5"
      >
        {/* <ProductsFilter disabled={isFetching || isError} /> */}
        <FilterDrawer
          disableUrlRedirects
          disabledButton={isFetching || isError}
        />
      </div>
      <section className="h-full grow flex-col overflow-y-auto">
        <div
          id="product-search-result"
          className="relative grid grow grid-cols-1 justify-end gap-2 dark:[color-scheme:dark] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          {isError && !isFetching && <DashboardFetchError refetch={refetch} />}
          {isFetching &&
            Array.from({ length: 5 }, (_, i) => <ProductCardLoader key={i} />)}

          {isSuccess && !isFetching && productList()}
        </div>
      </section>
      <div className="relative flex flex-row-reverse items-center">
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        <Button
          className="absolute h-9 w-auto px-4 md:h-10"
          onClick={closeModal}
        >
          Continuer
        </Button>
      </div>
    </Modal>
  );
}
