import { Product, ProductsFilters } from "@/features/products/types";
import { StateCreator } from "zustand";

export interface ProductSlice {
  selectedProducts: Product[];
  products: Product[];
  addSelectedProduct: (product: Product) => void;
  /** Detects whether fetchProducts action has previously been fired or not
   */

  removeSelectedProduct: (index: number) => void;
  removeAllSelectedProducts: () => void;
  deleteProduct: (code: string) => void;
  fetchSingleProduct: (code: string) => Promise<void>;

  productsFilters: ProductsFilters;
  setProductsFilters: (v: ProductsFilters) => void;
  resetProductsFilters: () => void;
  setProductsCurrentPage: (page: number) => void;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  selectedProducts: [],
  products: [],
  addSelectedProduct: (product: Product) => {
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    }));
  },
  removeSelectedProduct: (index: number) => {
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((_, i) => i !== index),
    }));
  },
  removeAllSelectedProducts: () => {
    set(() => ({
      selectedProducts: [],
    }));
  },
  deleteProduct: (code: string) => {
    set((state) => ({
      products: state.products.filter((product) => product.code !== code),
    }));
  },

  fetchSingleProduct: async (code: string) => {
    try {
      const data = await fetch(`/api/products/${code}`, {
        method: "GET",
      });
      const product = await (data.json() as Promise<Product>);

      set((state) => ({
        selectedProducts: [...state.selectedProducts, product],
      }));
    } catch (e) {
      console.error("Error fetching product by code", e);
    }
  },

  productsFilters: {
    currentPage: 0,
  },
  setProductsFilters: (filters) => {
    set(() => ({ productsFilters: filters }));
  },
  resetProductsFilters: () => {
    set(() => ({ productsFilters: { currentPage: 0 } }));
  },
  setProductsCurrentPage: (page) => {
    set((state) => {
      return {
        productsFilters: {
          ...state.productsFilters,
          currentPage: page,
        },
      };
    });
  },
});
