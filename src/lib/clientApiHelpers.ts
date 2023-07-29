import { Product } from "@/store/productSlice";
import { Wilaya } from "@/store/wilayaSlice";
import { PostImageSuccessResponsePayload, PostOrderRequestPayload } from "@/types/api";

import ky from "ky"

export const postImage = async (imageFile: File) => {
  const fromData = new FormData();
  fromData.append("image", imageFile);

  try {
    const response = await fetch("/api/images", {
      method: "POST",
      body: fromData,
    });
    const data = await response.json();
    // const f = await ky.post("/api/images", {
    //   body: fromData,
    // }).formData()

    if (response.status === 201) {
      return {
        status: response.status,
        data: data as PostImageSuccessResponsePayload,
      };
    } else {
      return {
        status: response.status,
      };
    }
  } catch (e) {
    throw e;
  }
};


export const getWilayas = async (): Promise<Wilaya[]> => {
  const data: Wilaya[] = await ky.get("/api/wilayas").json()
  return data
}
/**
 * Fetch a single product from the api
 * @param queryKey React query keys array where the second array item is the product code
 * @returns fetched product data
 */
export const getSingleProduct = async ([_, productCode]: (string | null)[]): Promise<Product> => {
  try {
    if (!productCode) throw "No product code";
    const data: Product = await ky.get(`/api/products/${productCode}`).json();
    return data
  } catch (error) {
    console.error("Error fethcing single product: ", error)
    throw error
  }
}
/**
 * fetche all the products from the api
 * @returns all products data
 */
export const getProducts = async (): Promise<Product[]> => {
  return await ky.get("/api/products").json();
}

/**
 * post request to save an order
 * @param order 
 * @returns returns the order id
 */
export const postOrder = async (order: PostOrderRequestPayload): Promise<string> => {
  const orderId: string = await ky.post(`/api/orders`, {
    json: order
  }).json();
  return orderId
}

