import {
  Product,
  ProductsFilters,
  SelectedProducts,
  SelectedProductsQuantity,
} from "@/features/products/types";
import { MAX_PRODUCT_QUANTITY } from "@/lib/constants";
import { StateCreator } from "zustand";

export interface ProductSlice {
  selectedProducts: SelectedProducts;
  selectedProductsQuantity: SelectedProductsQuantity;
  increaseQuantity: (productCode: string) => void;
  decreaseQuantity: (productCode: string) => void;
  setQuantity: (productCode: string, qt: number) => void;
  products: Product[];
  addSelectedProduct: (product: Product) => void;
  removeSelectedProduct: (productCode: string) => void;
  removeAllSelectedProducts: () => void;
  productsFilters: ProductsFilters;
  setProductsFilters: (v: ProductsFilters) => void;
  resetProductsFilters: () => void;
  setProductsCurrentPage: (page: number) => void;
}

export const productSlice: StateCreator<ProductSlice> = (set) => ({
  selectedProducts: {},
  selectedProductsQuantity: {},

  setQuantity: (productCode, qt) => {
    set((state) => {
      // let quantity = qt;
      // if (qt > MAX_PRODUCT_QUANTITY) {
      //   quantity = MAX_PRODUCT_QUANTITY;
      // }
      // if (qt <= 0) {
      //   quantity = 1;
      // }

      return {
        selectedProductsQuantity: {
          ...state.selectedProductsQuantity,
          [productCode]: qt,
        },
      };
    });
  },
  increaseQuantity: (productCode) => {
    set((state) => {
      const currentQuantity = state.selectedProductsQuantity[productCode];
      if (currentQuantity === MAX_PRODUCT_QUANTITY) return {};

      const computedQuantity =
        currentQuantity + 1 > MAX_PRODUCT_QUANTITY
          ? MAX_PRODUCT_QUANTITY
          : currentQuantity + 1;
      return {
        selectedProductsQuantity: {
          ...state.selectedProductsQuantity,
          [productCode]: computedQuantity,
        },
      };
    });
  },
  decreaseQuantity: (productCode) => {
    set((state) => {
      const currentQuantity = state.selectedProductsQuantity[productCode];

      if (currentQuantity === 1) return {};

      const computedQuantity =
        currentQuantity - 1 <= 0 ? 1 : currentQuantity - 1;
      return {
        selectedProductsQuantity: {
          ...state.selectedProductsQuantity,
          [productCode]: computedQuantity,
        },
      };
    });
  },

  products: [],
  addSelectedProduct: (product: Product) => {
    // console.log("adding product", product);
    const key = product.code;
    set((state) => ({
      selectedProducts: {
        ...state.selectedProducts,
        [key]: product,
      },
      selectedProductsQuantity: {
        ...state.selectedProductsQuantity,
        [key]: 1,
      },
    }));
  },
  removeSelectedProduct: (productCode: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [productCode]: _, ...selectedProductsToKeep } =
        state.selectedProducts;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [productCode]: __, ...selectedProductsQuantityToKeep } =
        state.selectedProductsQuantity;

      return {
        selectedProducts: selectedProductsToKeep,
        selectedProductsQuantity: selectedProductsQuantityToKeep,
      };
    });
  },
  removeAllSelectedProducts: () => {
    set(() => ({
      selectedProducts: {},
      selectedProductsQuantity: {},
    }));
  },
  productsFilters: {
    currentPage: 0,
  },
  setProductsFilters: (filters) => {
    set(() => ({ productsFilters: filters }));
  },
  resetProductsFilters: () => {
    set(() => ({ productsFilters: { currentPage: 0 } }));
  },
  setProductsCurrentPage: (page) => {
    set((state) => {
      return {
        productsFilters: {
          ...state.productsFilters,
          currentPage: page,
        },
      };
    });
  },
});
