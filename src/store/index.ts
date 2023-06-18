import { OrderFormSlice, orderFormSlice } from "./orderFormSlice";
import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";
import { WilayaSlice, uiSlice } from "./wilayaSlice";

export const useStore = create<ProductSlice & WilayaSlice & OrderFormSlice>()(
  (...args) => ({
    ...productSlice(...args),
    ...uiSlice(...args),
    ...orderFormSlice(...args),
  })
);
