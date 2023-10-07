"use client";
import { useStore } from "@/store";
import Modal from "../Modal";
import { useGetProducts } from "@/features/products/api/getProducts";
import ProductCard from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types";
import DashboardProductsFilter from "@/features/products/components/dashboard/DashboardProductsFilter";
import DashboardFetchError from "../dashboard/DashboardFetchError";
import ProductCardLoader from "../ProductCardLoader";
import DashboardPagination from "../dashboard/DashboardPagination";

interface Props {
  closeModal: () => void;
}

export default function AddProduct({ closeModal }: Props) {
  const { addSelectedProduct, productsFilters, setProductsCurrentPage } = useStore();

  const { data, isFetching, isSuccess, isError, refetch } =
    useGetProducts(productsFilters);

  const handleAddProduct = (product: Product) => {
    addSelectedProduct(product);
    closeModal();
  };

  const productsPerPage = 10;
  const pageCount = Math.ceil((data?.count ?? 0) / productsPerPage);

  const handlePageChange = (event: { selected: number }) => {
    const selected = event.selected;
    const currentPage = productsFilters.currentPage;
    if (selected === currentPage) return;
    setProductsCurrentPage(selected);
  };

  const productList = data?.products.map((product) => {
    const { code, description, name, price, discount, images, stock } = product;
    return (
      <ProductCard
        name={name}
        key={code}
        description={description}
        price={price}
        discount={discount}
        images={images}
        stock={stock}
        isDashboard={false}
        code={code}
      >
        <button
          className="flex h-8 w-full items-center justify-center rounded-md bg-[#E9E9E9] font-semibold transition-colors hover:bg-gray-300 focus:bg-secondary 
          focus:text-white dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-700 dark:focus:bg-stone-900"
          onClick={() => handleAddProduct(product)}
        >
          Ajouter
        </button>
      </ProductCard>
    );
  });
  return (
    <Modal
      className="flex h-full flex-col rounded-lg bg-[#F3F3F3] pb-0 pt-4 shadow-md dark:bg-[#040404]"
      closeModal={closeModal}
      label="Ajouter un Produit"
      closeOnClickOutside
      overlayClassName="py-3"
    >
      <div
        id="select-category-container"
        className="relative my-5 flex h-12 max-h-12 min-h-[3rem] grow items-center justify-end"
      >
        <DashboardProductsFilter disabled={isFetching || isError} />
      </div>
      <section className="h-full grow flex-col overflow-y-auto">
        <div
          id="product-search-result"
          className="relative grid grow grid-cols-4 2xl:grid-cols-5 justify-end gap-2 dark:[color-scheme:dark]"
        >
          {isError && !isFetching && <DashboardFetchError refetch={refetch} />}
          {isFetching &&
            Array.from({ length: 5 }, (_, i) => <ProductCardLoader key={i} />)}

          {isSuccess && !isFetching && productList}
        </div>
      </section>
      <DashboardPagination pageCount={pageCount} className="m-0 p-0" onPageChange={handlePageChange} />
    </Modal>
  );
}
