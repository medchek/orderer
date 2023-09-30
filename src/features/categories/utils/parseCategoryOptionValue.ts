import { ProductCategoryPayload } from "@/features/products/types";
import { CATEGORY_CODE_LENGTH } from "@/lib/constants";


/**
 * Parse the category option value
 * @param value the category option value
 * @returns parsed value formatted according to what the server expects
 */
export const parseCategoryOptionValue = (
  value: string,
): ProductCategoryPayload | null => {
  if (!value || value.length < CATEGORY_CODE_LENGTH) return null;

  const [categoryCode, subcategoryCode] = value.split(":");

  return {
    categoryCode: categoryCode,
    ...(subcategoryCode ? { subcategoryCode: subcategoryCode } : undefined),
  };
};
