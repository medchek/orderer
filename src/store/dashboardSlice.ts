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
  // products
  isAddProductOpen: boolean;
  setIsAddProductOpen: (v: boolean) => void

  // Categories
  deleteCategoryData: CategoryDataClosed | CategoryDataOpen
  setDeleteCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;
  editCategoryData: CategoryDataClosed | CategoryDataOpen;
  setEditCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;

  categoryPerPage: number;
  /** Sets the number of categories that should be displayed per page */
  setCategoryPerPage: (n: number) => void;

  categoryFilterTerm: string;
  categoryFilterType: CategoryType;

  setCategoryFilterType: (v: CategoryType) => void
  /** The provided value will be trimmed and lowercased */
  setCategoryFilterTerm: (v: string) => void


}

export const dashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  // Products
  isAddProductOpen: false,
  setIsAddProductOpen: (v: boolean) => {
    set(() => ({ isAddProductOpen: v }))
  },

  // Categories
  deleteCategoryData: { isOpen: false },
  setDeleteCategoryData: (data) => {
    set(() => ({ deleteCategoryData: data }))
  },
  editCategoryData: { isOpen: false },
  setEditCategoryData: (data) => {
    set(() => ({ editCategoryData: data }))
  },
  categoryPerPage: 5,
  setCategoryPerPage: (n) => {
    set(() => ({ categoryPerPage: n }))
  },
  categoryFilterTerm: "",
  categoryFilterType: "category",
  setCategoryFilterTerm: (v) => {
    set(() => ({ categoryFilterTerm: v.trim().toLowerCase() }))
  },
  setCategoryFilterType: (v) => {
    set(() => ({ categoryFilterType: v, categoryFilterTerm: "" }))

  }


});
