"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";

import FilterInput from "./FilterInput";
import FilterLabel from "./FilterLabel";
import CategorySelect from "@/features/categories/components/CategorySelect";
import { generateCategoryOptionValue } from "@/features/categories/utils/generateCategoryOptionValue";
import useProductFilter from "@/features/products/hooks/useProductFilter";
import clsx from "clsx";
import { BiFilterAlt } from "react-icons/bi";
import SwitchButton from "../SwitchButton";
import { toPositiveNumber } from "@/lib/utils";

interface Props {
  disabledButton?: boolean;
  /** Prevent query params changes when applying the filters */
  disableUrlRedirects?: boolean;
}

export default function FilterDrawer({
  disabledButton,
  disableUrlRedirects,
}: Props) {
  //!SECTION

  const {
    hasFilters,
    applyFilters,
    resetFilters,
    name,
    setName,
    setCategoryData: handleCategoryOnChange,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    isDiscount,
    setIsDiscount,
    categoryCode,
    subcategoryCode,
    inStock,
    setInStock,
  } = useProductFilter(disableUrlRedirects);

  return (
    <Drawer>
      <DrawerTrigger
        title="Filtrer par"
        disabled={disabledButton}
        className={clsx(
          "flex h-10 items-center justify-center gap-1 rounded-lg bg-neutral-50 px-4 text-base font-medium shadow-md outline-none transition-colors disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950 disabled:dark:bg-neutral-950 dark:disabled:text-neutral-600 lg:px-6",

          {
            "text-secondary": hasFilters,
            "text-neutral-600 dark:text-neutral-400": !hasFilters,
          },
        )}
      >
        <BiFilterAlt className="h-6 w-6" /> Filtrer
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-300 dark:border-neutral-900 dark:bg-neutral-950">
        <span className="mx-auto h-1.5 w-20 rounded-full bg-neutral-400 dark:bg-neutral-800"></span>
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-left text-xl font-semibold dark:text-neutral-50">
            Filterer
          </DrawerTitle>
          {hasFilters && <p className="text-blue-600">Filtres appliqués</p>}
        </DrawerHeader>

        <div className="flex flex-col gap-3 px-4 lg:gap-2">
          <FilterLabel htmlFor="product-name" label="Nom du produit" column>
            <FilterInput
              placeholder="Chercher par nom"
              id="product-name"
              className="h-12 w-full lg:w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
              minLength={2}
              maxLength={200}
              autoComplete="off"
            />
          </FilterLabel>
          <FilterLabel label="Catégorie" htmlFor="category-select" column>
            <CategorySelect<{ category: string }>
              className="h-12 w-full rounded-md bg-neutral-200 px-2 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 lg:w-full"
              value={generateCategoryOptionValue(categoryCode, subcategoryCode)}
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

          <FilterLabel
            label="Prix"
            htmlFor="min-price-input"
            className="h-12"
            column
          >
            <div className="flex h-full w-full items-center justify-between gap-2 lg:w-full">
              <FilterInput
                id="min-price-input"
                placeholder="Min"
                className="h-full w-1/2 lg:w-1/2"
                type="number"
                onChange={(e) => setMinPrice(e.target.value.trim())}
                value={minPrice}
                min={0}
              />
              <FilterInput
                type="number"
                id="price-select"
                placeholder="Max"
                className="h-full w-1/2 lg:w-1/2"
                onChange={(e) => setMaxPrice(e.target.value.trim())}
                value={maxPrice}
                min={toPositiveNumber(minPrice) + 1}
              />
            </div>
          </FilterLabel>

          <div className="flex w-full gap-2">
            <div className="w-1/2">
              <FilterLabel
                label="En réduction"
                htmlFor="is-discount-switch"
                className="items-center justify-between gap-3"
                column
              >
                <label
                  className="text-sm text-neutral-500 md:text-base"
                  htmlFor="is-discount-switch"
                >
                  Afficher uniquement les produits en réduction.
                </label>
                <SwitchButton
                  id="is-discount-switch"
                  isActive={isDiscount === "1"}
                  onClick={() => {
                    setIsDiscount(isDiscount === "1" ? "0" : "1");
                  }}
                />
              </FilterLabel>
            </div>
            <div className="w-1/2">
              <FilterLabel
                label="En Stock"
                htmlFor="in-stock-switch"
                column
                className="items-center justify-between gap-3"
              >
                <label
                  className="text-sm text-neutral-500 md:text-base"
                  htmlFor="in-stock-switch"
                >
                  Afficher uniquement les produits en stock.
                </label>
                <SwitchButton
                  id="in-stock-switch"
                  isActive={inStock === "1"}
                  onClick={() => {
                    setInStock(inStock === "1" ? "0" : "1");
                  }}
                />
              </FilterLabel>
            </div>
          </div>
        </div>

        <DrawerFooter className="flex flex-row justify-end">
          <button
            type="button"
            className="h-10 w-36 rounded-md bg-blue-600 bg-transparent px-2 text-neutral-600 hover:text-neutral-700 active:bg-neutral-200 dark:text-neutral-400 hover:dark:text-neutral-200 focus:dark:bg-transparent active:dark:bg-neutral-800"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
          <DrawerClose
            className="h-10 w-36 rounded-md bg-blue-600 px-2 text-neutral-100 transition-colors hover:bg-blue-500 focus:bg-blue-700 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 disabled:dark:bg-stone-600"
            onClick={applyFilters}
            type="button"
          >
            Appliquer
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
