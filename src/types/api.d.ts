import { OrderStatus } from "@/lib/constants";
import { Product } from "@/store/productSlice";
import { Status } from "@prisma/client";


export type PromiseStatus = "init" | "fetching" | "success" | "error"


/**
 * Successful response payload for api/images/ POST request
 */
export interface PostImageSuccessResponsePayload {
  id: string;
  originalName: string;
  originalSize: number;
}
export interface GetProductsSuccessResponsePayload {
  count: number;
  products: Product[]
}
export interface PostProductBodyPayload {
  name: string;
  price: number;
  description: string;
  stock: number | null;
  category: { categoryId: number, subcategoryId?: number } | null;
  discount: number;
  images: string[];
}



export interface PostProductSuccessResponsePayload extends Product { }

export interface PatchProductBodyPayload {
  name?: string;
  price?: number;
  description?: string;
  stock?: number | null;
  categoryId?: number | null;
  discount?: number;
  images?: {
    added: string[];
    removed: string[];
  };
}
export interface PatchProductSuccessResponsePayload extends PostProductSuccessResponsePayload { }

export interface PatchShippingPricesRequestPayload {
  homePrice?: number;
  officePrice?: number;
  availableHome?: boolean;
  availableOffice?: boolean;
  wilayas: number[];
}

export interface PostOrderRequestPayload {
  phone: string;
  name?: string;
  lastName?: string;
  email?: string;
  address?: string;
  isHome: boolean;
  wilayaId: number;
  townCode: number;
  productsCode: string[];
}
export interface PostOrderSuccessResponsePayload {
  orderCode: string;
}

export interface GetAllOrdersSuccessResponsePayload {
  address: string | null;
  code: string;
  isHome: boolean;
  status: Status;
  createdAt: Date;
  user: {
    phone: string | null;
  };
  wilaya: {
    name: string;
    arName: string;
    code: number;
    homePrice: number;
    officePrice: number;
  };
  town: {
    code: number,
    arName: string,
    name: string
  }
  orderProducts: {
    product: {
      name: string;
      price: number;
      discount: number;
    };
  }[]
}

export interface PostCategoryRequestPayload {
  name: string;
}
export interface PostCategorySuccessReponsePayload {
  id: number;
  name: string;
}

export type GetCategoriesSuccessResponsePayload = {
  id: number;
  name: string;
  subCategories?: { id: number; name: string }[]
}[]

export interface PostSubCategoryRequestPayload {
  categoryId: number;
  name: string;
}

export interface PostSubCategorySuccessResponsePayload extends PostSubCategoryRequestPayload {
  id: number
}

export type GetTownsSuccessResponsePayload = {
  name: string;
  arName: string;
  code: number;
}[]

export interface PatchCategoryRequestPayload {
  name: string;
}
export interface PatchSubcategorySuccessResponsePayload {
  id: number;
  /** Parent category id */
  categoryId: number;
  name: string;
}

export interface PatchCategorySuccessResponsePayload extends PatchCategoryRequestPayload { id: number; }
