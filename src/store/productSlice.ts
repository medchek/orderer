import { StateCreator } from "zustand";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProductSlice {
  products: Product[];
  addProduct: () => void;
  removeProduct: (productId: number) => void;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  products: [
    {
      id: 1,
      name: "Apple Watch Series 8 Gps + Cellular 45mm",
      description:
        "Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, Couleur: Midnight, ",
      price: 5000,
    },
    {
      id: 2,
      name: "Samsung Galaxy Buds Plus, Bluetooth 5.0",
      description: "Couleur: Black",
      price: 12000,
    },
    {
      id: 3,
      name: "Power Bank SAMSUNG 10 000mAh",
      description: "Couleur: Silver",
      price: 21000,
    },
  ],
  addProduct: () => null,
  removeProduct: (productId: number) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
});
