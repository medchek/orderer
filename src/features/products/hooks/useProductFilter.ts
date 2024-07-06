import { useCallback, useEffect, useState } from "react";
import {
  ProductCategoryPayload,
  ProductsFilters,
  ProductsFiltersParams,
} from "../types";
import { useStore } from "@/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isValidPositiveStringNumber, toPositiveNumber } from "@/lib/utils";
import { CATEGORY_CODE_LENGTH } from "@/lib/constants";

/**
 * A hook to reuse product filter logic
 */
function useProductFilter(disableUrlRedirects: boolean = false) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { productsFilters, setProductsFilters, resetProductsFilters } =
    useStore();

  const [hasFilters, setHasFilters] = useState<boolean>(false);

  // filter local state
  const [name, setName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [subcategoryCode, setSubcategoryCode] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [isDiscount, setIsDiscount] = useState<"0" | "1" | "">("");
  const [inStock, setInStock] = useState<"0" | "1" | "">("");

  // Handle params presetting
  useEffect(() => {
    const filters: ProductsFilters = {
      currentPage: productsFilters.currentPage,
    };
    const page = searchParams.get("page");
    const name = searchParams.get("name");
    const cat = searchParams.get("category");
    const subcat = searchParams.get("subcategory");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const isDiscount = searchParams.get("isDiscount");
    const inStock = searchParams.get("inStock");

    if (page && isValidPositiveStringNumber(page, true)) {
      filters.currentPage = toPositiveNumber(page);
    }

    if (name && name.length >= 2 && name.length <= 200) {
      setName(name);
      filters.name = name;
    }
    if (cat && cat.length === CATEGORY_CODE_LENGTH) {
      setCategoryCode(cat);
      filters.category = cat;
    }
    if (subcat && subcat.length === CATEGORY_CODE_LENGTH) {
      setSubcategoryCode(subcat);
      filters.subcategory = subcat;
    }
    if (minPrice && isValidPositiveStringNumber(minPrice)) {
      setMinPrice(minPrice);
      filters.minPrice = minPrice;
    }

    if (maxPrice && isValidPositiveStringNumber(maxPrice)) {
      setMaxPrice(maxPrice);
      filters.maxPrice = maxPrice;
    }

    if (isDiscount === "1") {
      setIsDiscount(isDiscount);
      filters.isDiscount = isDiscount;
    }
    if (inStock === "1") {
      setInStock(inStock);
      filters.inStock = inStock;
    }

    setProductsFilters(filters);
  }, [productsFilters.currentPage, searchParams, setProductsFilters]);

  // handle hasFilter state
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPage: _, ...rest } = productsFilters;
    setHasFilters(!!Object.keys(rest).length);
  }, [productsFilters]);

  /**
   * Sets the category and subcategory filter data
   * @param data
   */
  const setCategoryData = (data: ProductCategoryPayload | null) => {
    setCategoryCode(data?.categoryCode ?? "");
    setSubcategoryCode(data?.subcategoryCode ?? "");
  };

  /**
   * Generates the url search params based on the filter object
   * @returns products filters query params
   */
  const generateSearchParam = (filters: ProductsFiltersParams): string => {
    const url = new URLSearchParams();

    const paramKeys = Object.keys(filters) as Array<
      keyof ProductsFiltersParams
    >;
    // in case there is only the current page , dont generate any params since there is none
    // if (paramKeys.length === 1 && paramKeys[0] === "currentPage") {
    //   return "";
    // }

    paramKeys.forEach((key) => {
      const queryParamValue = filters[key];
      if (queryParamValue !== null && queryParamValue !== undefined) {
        // rename currentPage to page
        url.set(
          key === "currentPage" ? "page" : key,
          queryParamValue.toString(),
        );
      }
    });

    return url.toString();
  };

  /**
   * pushes the new query string to the history, redirecting to it.
   * Does not redirect if **`queryString`** is empty
   * @param queryString the full query string
   */
  const applyNewQueryString = useCallback(
    (queryString: string) => {
      // only redirect if there is a new queryParam
      console.log("checking query", queryString, "done");
      if (queryString !== "") {
        console.log("queryString updated!", queryString);
        router.push(`${pathname}?${queryString}`);
      }
    },
    [pathname, router],
  );

  /**
   * Apply the filter after selecting them
   */
  const applyFilters = useCallback(() => {
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
    if (isDiscount === "1") filters.isDiscount = isDiscount;
    if (inStock === "1") filters.inStock = inStock;

    setProductsFilters(filters);

    console.log("appying filter", filters);
    const queryParams = generateSearchParam(filters);
    if (!disableUrlRedirects) {
      applyNewQueryString(queryParams);
    }
  }, [
    applyNewQueryString,
    categoryCode,
    disableUrlRedirects,
    inStock,
    isDiscount,
    maxPrice,
    maxStock,
    minPrice,
    minStock,
    name,
    productsFilters.currentPage,
    setProductsFilters,
    subcategoryCode,
  ]);

  /**
   * Resets all filters to empty strings
   */
  const resetFilters = useCallback(() => {
    resetProductsFilters();

    setName("");
    setCategoryCode("");
    setSubcategoryCode("");
    setMinPrice("");
    setMaxPrice("");
    setMinStock("");
    setMaxStock("");
    setIsDiscount("");
    setInStock("");

    const queryParams = generateSearchParam({
      currentPage: 0,
    });
    // only redirect if it is allowed
    if (!disableUrlRedirects) {
      applyNewQueryString(queryParams);
    }
  }, [applyNewQueryString, disableUrlRedirects, resetProductsFilters]);

  return {
    hasFilters,
    resetFilters,
    applyFilters,
    setCategoryData,
    name,
    setName,
    categoryCode,
    // setCategoryCode,
    subcategoryCode,
    // setSubcategoryCode,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minStock,
    setMinStock,
    maxStock,
    setMaxStock,
    isDiscount,
    setIsDiscount,

    inStock,
    setInStock,
  };
}

export default useProductFilter;
