import { useStore } from "@/store";

import DashboardProductFormModal from "./DashboardProductFormModal";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useGetProducts } from "../../api/getProducts";
import { ProductFormSuccessSubmitData } from "../../types";
import { getUpdatedFields } from "../../utils/getUpdatedProductFields";
import { usePatchProduct } from "../../api/patchProduct";
// import { PatchProductBodyPayload } from "../../api/patchProduct";

interface Props {
  closeModal: () => void;
  productIndex: number;
}

export default function DashboardUpdateProduct({
  closeModal,
  productIndex,
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar, productsFilters } = useStore();

  const { mutate, isLoading } = usePatchProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all(productsFilters).queryKey,
      });

      showSnackbar("Produit modifié avec succès", "success");
      closeModal();
    },
    onError: () => {
      showSnackbar(
        "Une erreur est survenu lors de la modification du produit, veuillez réessayer",
        "error",
      );
    },
  });

  const { data: products } = useGetProducts(productsFilters);

  const productToUpdate = products?.products[productIndex];

  const onFormSubmit = async (data: ProductFormSuccessSubmitData) => {
    if (!productToUpdate) return;

    const apiPayload = getUpdatedFields(productToUpdate, data);

    console.log("updated product form data", data);
    console.log("current product data =>", productToUpdate);
    // showSnackbar("ok", "default", 500);

    if (Object.keys(apiPayload).length === 0) {
      return showSnackbar("Aucune modification n'a été apportée", "default");
    }
    mutate({
      code: productToUpdate.code,
      data: apiPayload,
    });
    return;
  };

  return (
    <DashboardProductFormModal
      closeModal={closeModal}
      productData={productToUpdate}
      onSubmit={onFormSubmit}
      isLoading={isLoading}
    />
  );
}
