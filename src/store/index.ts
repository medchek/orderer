import { snackbarSlice, SnackbarSlice } from "./snackbarSlice";
import { OrderFormSlice, orderFormSlice } from "./orderFormSlice";
import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";
import { WilayaSlice, wilayaSlice } from "./wilayaSlice";
import { DashboardSlice, dashboardSlice } from "./dashboardSlice";

import { devtools } from "zustand/middleware";
import {
  ImageVisualizerSlice,
  imageVisualizerSlice,
} from "./imageVisualizerSlice";

export const useStore = create<
  ProductSlice &
    WilayaSlice &
    OrderFormSlice &
    SnackbarSlice &
    DashboardSlice &
    ImageVisualizerSlice
>()(
  devtools(
    (...args) => ({
      ...productSlice(...args),
      ...wilayaSlice(...args),
      ...orderFormSlice(...args),
      ...snackbarSlice(...args),
      ...dashboardSlice(...args),
      ...imageVisualizerSlice(...args),
    }),
    {
      // enabled: process.env.NODE_ENV === "development",
      name: "zustandStore",
      serialize: { options: true },
    },
  ),
);
