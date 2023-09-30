import { GetOrdersQueryFilter } from "@/features/orders/api/getOrders";
import { StateCreator } from "zustand";

export type CategoryType = "category" | "subcategory";
interface CategoryDataClosed {
  isOpen: false;
}
export interface CategoryDataOpen {
  type: CategoryType;
  isOpen: true;
  name: string;
  code: string;
}
export interface DashboardSlice {
  // products
  isAddProductOpen: boolean;
  setIsAddProductOpen: (v: boolean) => void;
  // image
  isUploadingImage: boolean;
  setIsUploadingImage: (v: boolean) => void;

  // Categories
  deleteCategoryData: CategoryDataClosed | CategoryDataOpen;
  setDeleteCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;
  editCategoryData: CategoryDataClosed | CategoryDataOpen;
  setEditCategoryData: (v: CategoryDataClosed | CategoryDataOpen) => void;

  categoryPerPage: number;
  /** Sets the number of categories that should be displayed per page */
  setCategoryPerPage: (n: number) => void;

  categoryFilterTerm: string;
  categoryFilterType: CategoryType;

  setCategoryFilterType: (v: CategoryType) => void;
  /** The provided value will be trimmed and lowercased */
  setCategoryFilterTerm: (v: string) => void;

  // orders
  orderCodeToDelete: string | null;
  setOrderCodeToDelete: (code: string | null) => void;
  ordersQueryFilters: GetOrdersQueryFilter;
  setOrdersQueryFilters: (filter: GetOrdersQueryFilter) => void;

  setOrdersCurrentPage: (p: number) => void;

  orderPhoneToBlock: string | null;
  setOrderPhoneToBlock: (phone: string | null) => void;

  // blacklist

  blacklistedNumberIdToDelete: number | null;
  setBlacklistedNumberIdToDelete: (n: number | null) => void;

  // copy to clipboard
  clipboard: string;
  setClipboard: (v: string) => void;
}

export const dashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  // Products
  isAddProductOpen: false,
  setIsAddProductOpen: (v: boolean) => {
    set(() => ({ isAddProductOpen: v }));
  },

  isUploadingImage: false,
  setIsUploadingImage: (v) => {
    set(() => ({ isUploadingImage: v }));
  },

  // Categories
  deleteCategoryData: { isOpen: false },
  setDeleteCategoryData: (data) => {
    set(() => ({ deleteCategoryData: data }));
  },
  editCategoryData: { isOpen: false },
  setEditCategoryData: (data) => {
    set(() => ({ editCategoryData: data }));
  },
  categoryPerPage: 10,
  setCategoryPerPage: (n) => {
    set(() => ({ categoryPerPage: n }));
  },
  categoryFilterTerm: "",
  categoryFilterType: "category",
  setCategoryFilterTerm: (v) => {
    set(() => ({ categoryFilterTerm: v.trim().toLowerCase() }));
  },
  setCategoryFilterType: (v) => {
    set(() => ({ categoryFilterType: v, categoryFilterTerm: "" }));
  },
  orderCodeToDelete: null,
  setOrderCodeToDelete: (code) => set(() => ({ orderCodeToDelete: code })),
  ordersQueryFilters: { currentPage: 0 },
  setOrdersQueryFilters: (filter: GetOrdersQueryFilter) => {
    set(() => ({ ordersQueryFilters: filter }));
  },
  setOrdersCurrentPage: (page) => {
    set((state) => {
      return {
        ordersQueryFilters: {
          ...state.ordersQueryFilters,
          currentPage: page,
        },
      };
    });
  },

  orderPhoneToBlock: null,
  setOrderPhoneToBlock: (phone) => set(() => ({ orderPhoneToBlock: phone })),

  blacklistedNumberIdToDelete: null,
  setBlacklistedNumberIdToDelete: (n) => {
    set(() => ({ blacklistedNumberIdToDelete: n }));
  },

  clipboard: "",
  setClipboard: (v) => {
    set(() => ({ clipboard: v }));
  },
});
