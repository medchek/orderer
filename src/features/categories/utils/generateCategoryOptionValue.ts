/**
 * Generates the category option value based on the provided codes
 * @param categoryCode the category code
 * @param subcategoryCode the subcategory code
 * @returns formatted category option value
 */
export const generateCategoryOptionValue = (
  categoryCode?: string,
  subcategoryCode?: string,
) => {
  if (!categoryCode && !subcategoryCode) return "";
  else return categoryCode + (subcategoryCode ? `:${subcategoryCode}` : "");
};
