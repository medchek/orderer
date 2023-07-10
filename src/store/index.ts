import { snackbarSlice, SnackbarSlice } from "./snackbarSlice";
import { OrderFormSlice, orderFormSlice } from "./orderFormSlice";
import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";
import { WilayaSlice, uiSlice } from "./wilayaSlice";

export const useStore = create<
  ProductSlice & WilayaSlice & OrderFormSlice & SnackbarSlice
>()((...args) => ({
  ...productSlice(...args),
  ...uiSlice(...args),
  ...orderFormSlice(...args),
  ...snackbarSlice(...args),
}));
