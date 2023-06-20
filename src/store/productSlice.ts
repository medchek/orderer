import { StateCreator } from "zustand";
export interface Product {
  name: string;
  description: string;
  price: number;
  code: string;
  discount: number;
  stock: number;
  images: { link: string }[];
}

export interface ProductSlice {
  selectedProducts: Product[];
  products: Product[];
  addSelectedProduct: (product: Product) => void;
  isFetchingProducts: boolean;
  /** Detects whether fetchProducts action has previously been fired or not
   */
  hasFetchedAllProducts: boolean;
  removeProduct: (index: number) => void;
  fetchProducts: () => Promise<void>;
  fetchSingleProduct: (code: string) => Promise<void>;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  selectedProducts: [],
  products: [],
  hasFetchedAllProducts: false,
  isFetchingProducts: false,
  addSelectedProduct: (product: Product) => {
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    }));
  },
  removeProduct: (index: number) => {
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((_, i) => i !== index),
    }));
  },
  fetchProducts: async () => {
    try {
      set({ isFetchingProducts: true });
      const data = await fetch("/api/products", {
        method: "GET",
      });
      const products = await (data.json() as Promise<Product[]>);

      set(() => ({
        products,
        hasFetchedAllProducts: true,
      }));
    } catch (e) {
      set(() => ({ hasFetchedAllProducts: false }));
      console.error("Error fetching products", e);
    } finally {
      set(() => ({
        isFetchingProducts: false,
      }));
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
});
