import { StateCreator } from "zustand";

export type CategoryType = "category" | "subcategory";
interface CategoryDataClosed {
  isOpen: false;
}
export interface CategoryDataOpen {
  type: CategoryType;
  isOpen: true;
  name: string;
  id: number;
}
export interface DashboardSlice {
  isAddProductOpen: boolean;
  deleteCategoryData: CategoryDataClosed | CategoryDataOpen
  setDeleteCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;
  editCategoryData: CategoryDataClosed | CategoryDataOpen;
  setEditCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;
}

export const dashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  isAddProductOpen: false,
  setIsAddProductOpen: (v: boolean) => {
    set(() => ({ isAddProductOpen: v }))
  },
  deleteCategoryData: { isOpen: false },
  setDeleteCategoryData: (data) => {
    set(() => ({ deleteCategoryData: data }))
  },
  editCategoryData: { isOpen: false },
  setEditCategoryData: (data) => {
    set(() => ({ editCategoryData: data }))
  }

});
