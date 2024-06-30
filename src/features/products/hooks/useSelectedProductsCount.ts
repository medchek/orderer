import { useStore } from "@/store";

/**
 * A hook to count the number of products selected for order
 * @returns the number of products selected for order
 */
export const useSelectedProductsCount = (): number => {
  const { selectedProducts } = useStore();

  return Object.keys(selectedProducts).length;
};
