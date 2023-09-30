import FilterInput from "@/components/filter/FilterInput";
import FilterLabel from "@/components/filter/FilterLabel";
import FilterSelect from "@/components/filter/FilterSelect";
import CategorySelect from "@/features/categories/components/CategorySelect";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { ProductCategoryPayload, ProductsFilters } from "../../types";

import { useGetProducts } from "../../api/getProducts";
import FilterPopover from "@/components/filter/FilterPopover";
import { generateCategoryOptionValue } from "@/features/categories/utils/generateCategoryOptionValue";

export default function DashboardProductsFilter() {
  const { productsFilters, setProductsFilters, resetProductsFilters } =
    useStore();
  const [hasFilters, setHasFilters] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPage: _, ...rest } = productsFilters;
    setHasFilters(!!Object.keys(rest).length);
  }, [productsFilters]);

  const [name, setName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [subcategoryCode, setSubcategoryCode] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [isDiscount, setIsDiscount] = useState<"0" | "1" | "">("");

  const handleCategoryOnChange = (data: ProductCategoryPayload | null) => {
    setCategoryCode(data?.categoryCode ?? "");
    setSubcategoryCode(data?.subcategoryCode ?? "");
  };
  const applyFilters = () => {
    const filters: ProductsFilters = {
      currentPage: productsFilters.currentPage,
    };
    if (name) filters.name = name.trim();
    if (categoryCode) filters.category = categoryCode;
    if (subcategoryCode) filters.subcategory = subcategoryCode;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (minStock) filters.minStock = minStock;
    if (maxStock) filters.maxStock = maxStock;
    if (isDiscount !== "") filters.isDiscount = isDiscount;

    setProductsFilters(filters);
  };

  /**
   * Resets all filters to empty strings
   */
  const resetFilters = () => {
    resetProductsFilters();

    setName("");
    setCategoryCode("");
    setSubcategoryCode("");
    setMinPrice("");
    setMaxPrice("");
    setMinStock("");
    setMaxStock("");
    setIsDiscount("");
  };

  const { data: productsData } = useGetProducts(productsFilters);

  return (
    <FilterPopover
      disabled={
        !productsData || (productsData.products.length === 0 && !hasFilters)
      }
      hasFilters={hasFilters}
      onApplyFiltersClick={applyFilters}
      onResetFiltersClick={resetFilters}
    >
      <div className="flex flex-col gap-2">
        <FilterLabel htmlFor="prod-name" label="Nom du produit">
          <FilterInput
            placeholder="Chercher par nom"
            id="prod-name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            minLength={2}
            autoComplete="off"
          />
        </FilterLabel>
        <FilterLabel label="Catégorie" htmlFor="cat-select">
          <CategorySelect<{ category: string }>
            className="h-8 w-48 rounded-md px-2  text-neutral-300 dark:bg-neutral-800"
            noLabel
            disablePrompt
            small
            emptyValueText="Toutes"
            onChange={handleCategoryOnChange}
            defaultValue={generateCategoryOptionValue(
              categoryCode,
              subcategoryCode,
            )}
          />
        </FilterLabel>

        <FilterLabel label="Prix" htmlFor="price-input" className="h-8">
          <div className="flex h-7 w-48 items-center justify-between gap-2">
            <FilterInput
              id="price-select"
              placeholder="Min"
              className="w-1/2"
              type="number"
              onChange={(e) => setMinPrice(e.target.value.trim())}
              value={minPrice}
              min={0}
            />
            <FilterInput
              type="number"
              id="price-select"
              placeholder="Max"
              className="w-1/2"
              onChange={(e) => setMaxPrice(e.target.value.trim())}
              value={maxPrice}
              min={0}
            />
          </div>
        </FilterLabel>

        <FilterLabel label="Stock" htmlFor="price-input" className="h-8">
          <div className="flex h-7 w-48 items-center justify-between gap-2">
            <FilterInput
              type="number"
              id="price-select"
              placeholder="Min"
              className="w-1/2"
              onChange={(e) => setMinStock(e.target.value.trim())}
              value={minStock}
              min={0}
            />
            <FilterInput
              type="number"
              id="price-select"
              placeholder="Max"
              className="w-1/2"
              onChange={(e) => setMaxStock(e.target.value.trim())}
              value={maxStock}
              min={0}
            />
          </div>
        </FilterLabel>

        <FilterLabel label="En réduction" htmlFor="is-discount-select">
          <FilterSelect
            id="is-discount-select"
            onChange={(e) =>
              setIsDiscount(e.target.value.trim() as "1" | "0" | "")
            }
            value={isDiscount}
          >
            <option value="">Non précisé</option>
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </FilterSelect>
        </FilterLabel>
      </div>
    </FilterPopover>
  );
}
