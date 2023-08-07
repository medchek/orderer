import { PatchCategoryRequestPayload, PatchCategorySuccessResponsePayload, PatchSubcategorySuccessResponsePayload } from './../types/api.d';
import { CategoryType } from "@/store/dashboardSlice";
import { Product } from "@/store/productSlice";
import { Wilaya } from "@/store/wilayaSlice";
import { GetAllOrdersSuccessResponsePayload, GetCategoriesSuccessResponsePayload, GetTownsSuccessResponsePayload, PostCategoryRequestPayload, PostCategorySuccessReponsePayload, PostImageSuccessResponsePayload, PostOrderRequestPayload, PostOrderSuccessResponsePayload, PostSubCategoryRequestPayload, PostSubCategorySuccessResponsePayload } from "@/types/api";

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

/**
 * Fetch all the wilayas from the api
 * @returns an array of all the wilayas
 */
export const getWilayas = async (): Promise<Wilaya[]> => {
  const data: Wilaya[] = await ky.get("/api/wilayas").json()
  return data
}

/**
 * Fetch all the wilayas from the api
 * @returns an array of all the wilayas
 */
export const getTowns = async (wilayaCode: number): Promise<GetTownsSuccessResponsePayload> => {
  return await ky.get(`/api/towns/${wilayaCode}`).json()

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
 * Delete a product by code
 * @param productCode the product code
 * @returns the delete product code
 */
export const deleteProduct = async (productCode: string): Promise<string> => {
  await ky.delete(`/api/products/${productCode}`).json();
  return productCode;
}

/**
 * post request to save an order
 * @param order 
 * @returns returns the order id
 */
export const postOrder = async (order: PostOrderRequestPayload): Promise<PostOrderSuccessResponsePayload> => {
  const orderId: PostOrderSuccessResponsePayload = await ky.post(`/api/orders`, {
    json: order
  }).json();
  return orderId
}

export const getOrders = async (): Promise<GetAllOrdersSuccessResponsePayload[]> => {

  return await ky.get("/api/orders").json();
}
/**
 * Delete an order
 * @param code the order code
 * @returns the deleted order code
 */
export const deleteOrder = async (code: string): Promise<string> => {
  await ky.delete(`/api/orders/${code}`).json();
  return code
}

/**
 * Fetch all the categories from the api
 * @returns the list of categories and their sub-categories
 */
export const getCategories = async (): Promise<GetCategoriesSuccessResponsePayload> => {
  return await ky.get("/api/categories").json()
}

export const postCategory = async (data: PostCategoryRequestPayload): Promise<PostCategorySuccessReponsePayload> => {
  return await ky.post("/api/categories", {
    json: data
  }).json()
}
export const postSubCategory = async (data: PostSubCategoryRequestPayload): Promise<PostSubCategorySuccessResponsePayload> => {
  return await ky.post("/api/subcategories", {
    json: data
  }).json()
}

/**
 * Delete request for categories and subcategories api routes
 * @param id The resource id
 * @param type This affects the api route endpoint. either categories or subcategories
 * @returns the id and category type that were provided
 */
export const deleteCategory = async ({ type, id }: { id: number, type: CategoryType }): Promise<{ id: number, type: CategoryType }> => {
  await ky.delete(`/api/${type === "category" ? "categories" : "subcategories"}/${id}`).json()
  return { id, type };
}

/**
 * Patch request for categories api route
 * @param id The category id
 * @param name the new category name
 * @returns the id and the new name of the category
 */

export const patchCategory = async ({ id, name }: { id: number, name: string }): Promise<PatchCategorySuccessResponsePayload> => {
  const patchedData: PatchCategorySuccessResponsePayload = await ky.patch(`/api/categories/${id}`, {
    json: { name }
  }).json();
  return patchedData
}

/**
 * Patch request for subcategories api route
 * @param id The subcategory resource id
 * @param name the new subcategory name
 * @returns the id, parent category id and the new name of the sub category
 */
export const PatchSubcategory = async ({ id, name }: { id: number; name: string }): Promise<PatchSubcategorySuccessResponsePayload> => {
  const patchedData: PatchSubcategorySuccessResponsePayload = await ky.patch(`/api/subcategories/${id}`, {
    json: { name }
  }).json();
  return patchedData
}