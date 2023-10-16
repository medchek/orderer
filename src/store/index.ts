import { ThemeSlice, themeSlice } from "./themeSlice";
import { snackbarSlice, SnackbarSlice } from "./snackbarSlice";
import { OrderFormSlice, orderFormSlice } from "./orderFormSlice";
import { create } from "zustand";
import { ProductSlice, productSlice } from "./productSlice";
import { WilayaSlice, wilayaSlice } from "./wilayaSlice";
import { DashboardSlice, dashboardSlice } from "./dashboardSlice";

import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<
  ProductSlice &
    WilayaSlice &
    OrderFormSlice &
    SnackbarSlice &
    DashboardSlice &
    ThemeSlice
>()(
  devtools(
    (...args) => ({
      ...productSlice(...args),
      ...wilayaSlice(...args),
      ...orderFormSlice(...args),
      ...snackbarSlice(...args),
      ...dashboardSlice(...args),
      ...persist(themeSlice, {
        name: "theme",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => state.theme,
      })(...args),
    }),
    {
      // enabled: process.env.NODE_ENV === "development",
      name: "zustandStore",
    },
  ),
);
