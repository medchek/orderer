import { StateCreator } from "zustand";

export enum SHIPPING_TYPE {
  HOME,
  OFFICE,
}

export interface OrderFormSlice {
  shippingType: SHIPPING_TYPE;
  setShippingType: (shippingType: SHIPPING_TYPE) => void;
}

export const orderFormSlice: StateCreator<OrderFormSlice> = (set) => ({
  shippingType: SHIPPING_TYPE.HOME,
  setShippingType: (shippingType: SHIPPING_TYPE) =>
    set(() => ({ shippingType })),
});
