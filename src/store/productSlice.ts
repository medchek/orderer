import { StateCreator } from "zustand";
interface Product {
  name: string;
  description: string;
  price: number;
  code: string;
  discount: number;
  images: { link: string }[];
}

export interface ProductSlice {
  selectedProducts: Product[];
  products: Product[];
  addSelectedProduct: (product: Product) => void;
  isFetching: boolean;
  /** Detects whether fetchProducts action has previously been fired or not
   */
  hasFetched: boolean;
  removeProduct: (index: number) => void;
  fetchProducts: () => Promise<void>;
  fetchSingleProduct: (code: string) => Promise<void>;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  selectedProducts: [
    // {
    //   discount: 0,
    //   name: "Apple Watch Series 8 Gps + Cellular 45mm",
    //   description:
    //     "Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, ",
    //   price: 5000,
    //   code: "product1",
    // },
    // {
    //   discount: 0,
    //   name: "Samsung Galaxy Buds Plus, Bluetooth 5.0",
    //   description: "Couleur: Black",
    //   price: 12000,
    //   code: "product2",
    // },
    // {
    //   discount: 0,
    //   name: "Power Bank SAMSUNG 10 000mAh",
    //   description: "Couleur: Silver",
    //   price: 21000,
    //   code: "product3",
    // },
  ],
  products: [],
  hasFetched: false,
  isFetching: false,
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
      set({ isFetching: true });
      const data = await fetch("/api/products", {
        method: "GET",
      });
      const products = await (data.json() as Promise<Product[]>);

      set(() => ({ products, isFetching: false, hasFetched: true }));
    } catch (e) {
      set(() => ({ hasFetched: true }));
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
});
