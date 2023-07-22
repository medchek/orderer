export type PromiseStatus = "init" | "fetching" | "success" | "error"


/**
 * Successful response payload for api/images/ POST request
 */
export interface PostImageSuccessResponsePayload {
  id: string;
  originalName: string;
  originalSize: number;
}

export interface PostProductBodyPayload {
  name: string;
  price: number;
  description: string;
  stock: number | null;
  categoryId: number | null;
  discount: number;
  images: string[];
}


export interface PostProductSuccessResponsePayload {
  code: string;
  name: string;
  price: number;
  description: string | null;
  stock: number | null;
  categoryId: number | null;
  discount: number;
  images: { id: string }[];
}

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
  productsCode: string[];
}