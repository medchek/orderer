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
