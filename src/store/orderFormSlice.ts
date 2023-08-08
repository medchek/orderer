import { OrderFormValues } from "@/components/home/order-form/OrderForm";
import { StateCreator } from "zustand";
import { Wilaya } from "./wilayaSlice";

export enum SHIPPING_TYPE {
  HOME,
  OFFICE,
}

export interface Town {
  code: number;
  name: string;
  arName: string;
}

export interface OrderFormSlice {
  shippingType: SHIPPING_TYPE;
  setShippingType: (shippingType: SHIPPING_TYPE) => void;
  confirmData: OrderFormValues | null;
  setConfirmData: (data: OrderFormValues | null) => void;
  isConfirming: boolean;
  setIsConfirming: (v: boolean) => void;

  selectedWilaya: Wilaya | null;
  setSelectedWilaya: (selectedWilaya: Wilaya) => void;

  selectedTown: Town | null,
  setSelectedTown: (town: Town) => void;


}

export const orderFormSlice: StateCreator<OrderFormSlice> = (set) => ({
  shippingType: SHIPPING_TYPE.HOME,
  setShippingType: (shippingType: SHIPPING_TYPE) =>
    set(() => ({ shippingType })),
  confirmData: null,
  setConfirmData: (data: OrderFormValues | null) => set(() => ({ confirmData: data })),
  isConfirming: false,
  setIsConfirming: (v) => {
    set(() => ({ isConfirming: v }))
  },

  selectedWilaya: null,
  setSelectedWilaya: (selectedWilaya) => {
    set(() => ({ selectedWilaya }));
  },
  selectedTown: null,
  setSelectedTown: (town) => {
    set(() => ({ selectedTown: town }));
  }
});
