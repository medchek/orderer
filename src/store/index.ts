import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";

export const useStore = create<ProductSlice>()((...args) => ({
  ...productSlice(...args),
}));
