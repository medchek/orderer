import { STATUS_OK } from "@/lib/constants";
import { PromiseStatus } from "@/types/api";
import { StateCreator } from "zustand";
export interface Product {
  name: string;
  description: string | null;
  price: number;
  code: string;
  discount: number;
  stock: number | null;
  category: { name: string } | null;
  subCategory: { name: string } | null;
  images: { id: string }[];
}


export interface ProductSlice {
  selectedProducts: Product[];
  products: Product[];
  addSelectedProduct: (product: Product) => void;
  isFetchingProducts: boolean;
  /** Detects whether fetchProducts action has previously been fired or not
   */
  hasFetchedAllProducts: boolean;
  productsFetchStatus: PromiseStatus,
  removeSelectedProduct: (index: number) => void;
  removeAllSelectedProducts: () => void;
  deleteProduct: (code: string) => void;
  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
  fetchSingleProduct: (code: string) => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product, productIndex: number) => void;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  selectedProducts: [],
  products: [],
  hasFetchedAllProducts: false,
  isFetchingProducts: false,
  productsFetchStatus: "init",
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
    set((state) => ({
      selectedProducts: [],
    }));
  },
  deleteProduct: (code: string) => {
    set((state) => ({
      products: state.products.filter((product) => product.code !== code),
    }));
  },
  fetchProducts: async () => {

    try {
      set(() => ({
        productsFetchStatus: "fetching"
      }))
      const response = await fetch("/api/products", {
        method: "GET",
      });
      const products: Product[] = await response.json();

      if (response.status === STATUS_OK) {
        set(() => ({
          products,
          productsFetchStatus: "success"
        }));
      } else {
        set(() => ({
          productsFetchStatus: "error"
        }))
      }
    } catch (e) {
      set(() => ({ productsFetchStatus: "error" }));
      console.error("Error fetching products", e);
    }
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
  setProducts: (products: Product[]) => {
    set(() => ({
      products,
    }));
  },
  addProduct: (product: Product) => {
    set((state) => ({
      products: [product, ...state.products],
    }));
  },
  updateProduct: (updatedProduct: Product, productIndex: number) => {
    set((state) => ({
      products: state.products.map((product, i) => {
        if (i === productIndex) {
          return updatedProduct
        } else {
          return product
        }
      }),
    }));
  },
});
