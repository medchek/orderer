import { PostProductBodyPayload } from "../api/postProduct";

export interface Product {
  name: string;
  description: string | null;
  price: number;
  code: string;
  discount: number;
  stock: number | null;
  category: { name: string } | null;
  subCategory: { name: string } | null;
  images: { id: string }[];
}

export type UploadStatus = "error" | "uploading" | "success";

export interface FileMetaData {
  imageId: string | null;
  file: File;
  status: UploadStatus;
  url: string;
}

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
