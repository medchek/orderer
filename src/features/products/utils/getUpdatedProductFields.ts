import { GetCategoriesSuccessResponse } from "@/features/categories/api/getCategories";
import { PatchProductBodyPayload } from "../api/patchProduct";
import { Product, ProductFormSuccessSubmitData } from "../types";
import { diff } from "fast-array-diff";
import { queryClient } from "@/lib/reactQuery";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Searches for category data from the categories query cache/data
 * @param name The category name to look for
 * @returns The category Object or undefined if not found
 */
export const getCategoryByName = (name: string) => {
  const categories = queryClient.getQueryData<GetCategoriesSuccessResponse>(
    queryKeys.categories.all.queryKey,
  );

  if (categories) {
    const targetCategory = categories.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase(),
    );

    return targetCategory;
  }
};

// TODO: this function in particular needs a test written for it

/**
 * Compares the current product data stored in the queryClient with the update product form data and returns only the updated fields
 * @param productToUpdate the target product to update state (should be gotten from the queryClient)
 * @param formValues the product form data
 * @returns All the patched fields formatted as the payload expected by the patch product api route
 */
export const getUpdatedFields = (
  productToUpdate: Product,
  formValues: ProductFormSuccessSubmitData,
): PatchProductBodyPayload => {
  const patchRequestBody: PatchProductBodyPayload = {};

  // handle category diffing

  // if product to update categry is not null
  if (productToUpdate.category) {
    // handle case where the product to update category is set and the new category data is null
    if (!formValues.category) {
      patchRequestBody.category = formValues.category;
    } else {
      const productToUpdateCategory = getCategoryByName(
        productToUpdate.category.name,
      );
      // type safety
      if (productToUpdateCategory) {
        // in case of a different, set the new data to be updated
        if (
          formValues.category.categoryCode !== productToUpdateCategory.id ||
          formValues.category.subcategoryCode !==
            formValues.category.subcategoryCode
        ) {
          patchRequestBody.category = formValues.category;
        }
      }
    }
  } else {
    // handle case when category is null
    if (formValues.category) {
      // if the product to update doesnt have any category set, and formValues contains category data, set it in the request body
      patchRequestBody.category = formValues.category;
    }
  }

  const description = formValues.description;
  const discount = formValues.discount;
  const price = formValues.price;
  const name = formValues.name;
  const stock = formValues.stock;

  if (description !== productToUpdate.description) {
    patchRequestBody.description = description;
  }
  // if (category != product.category) {
  //   updatedFields. = category;
  // }
  if (discount !== productToUpdate.discount) {
    patchRequestBody.discount = discount;
  }
  if (price !== productToUpdate.price) {
    patchRequestBody.price = price;
  }
  if (name !== productToUpdate.name) {
    patchRequestBody.name = name;
  }
  if (stock !== productToUpdate.stock) {
    patchRequestBody.stock = stock;
  }

  const productImages = productToUpdate.images.map(({ id }) => id);

  const images = diff(productImages, formValues.images);

  // add the images only if a difference exists between the state images and the store product images
  if (images.added.length || images.removed.length) {
    patchRequestBody.images = images;
  }

  return patchRequestBody;
};
