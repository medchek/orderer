import { StateCreator } from "zustand";
export interface DashboardSlice {
  isAddProductOpen: boolean;
  setIsAddProductOpen: (v: boolean) => void;
}

export const dashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  isAddProductOpen: false,
  setIsAddProductOpen: (v: boolean) => {
    set(() => ({ isAddProductOpen: v }))
  }
});
