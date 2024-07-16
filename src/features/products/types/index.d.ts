import { PostProductBodyPayload } from "../api/postProduct";

export interface Product {
  name: string;
  description: string | null;
  price: number;
  code: string;
  discount: number;
  stock: number | null;
  category: { name: string; code: string } | null;
  subCategory: { name: string; code: string } | null;
  images: { id: string }[];
}

export type SelectedProducts = {
  [productCode: string]: Product;
};

export type SelectedProductsQuantity = Record<keyof SelectedProducts, number>;

export type UploadStatus = "error" | "uploading" | "success";

export interface FileMetaData {
  imageId: string | null;
  file: File;
  status: UploadStatus;
  url: string;
}

// used for product post and patch requests
export type ProductCategoryPayload = {
  categoryCode: string;
  subcategoryCode?: string;
};

export interface ProductFormValues {
  name: string;
  price: string;
  description: string;
  stock: string;
  category: string;
  discount: string;
  images: string;
}

export interface ProductFormSuccessSubmitData extends PostProductBodyPayload {}

interface ProductsFiltersParams {
  currentPage: number;
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  minStock?: string;
  maxStock?: string;
  isDiscount?: "0" | "1";
  category?: string;
  subcategory?: string;
  inStock?: "0" | "1";
}

export type ProductsFilters = ProductsFiltersParams;

export type AllowedProductsFilterParams = keyof ProductsFiltersParams;
