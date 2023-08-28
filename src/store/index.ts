import { snackbarSlice, SnackbarSlice } from "./snackbarSlice";
import { OrderFormSlice, orderFormSlice } from "./orderFormSlice";
import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";
import { WilayaSlice, uiSlice } from "./wilayaSlice";
import { DashboardSlice, dashboardSlice } from "./dashboardSlice";

import { devtools } from "zustand/middleware";

export const useStore = create<
  ProductSlice & WilayaSlice & OrderFormSlice & SnackbarSlice & DashboardSlice
>()(
  devtools(
    (...args) => ({
      ...productSlice(...args),
      ...uiSlice(...args),
      ...orderFormSlice(...args),
      ...snackbarSlice(...args),
      ...dashboardSlice(...args),
    }),
    {
      // enabled: process.env.NODE_ENV === "development",
      name: "zustandStore",
    }
  )
);
