import { create } from "zustand";
import { IProductSlice, productSlice } from "./productSlice";

export const useStore = create<IProductSlice>()((...args) => ({
  ...productSlice(...args),
}));
