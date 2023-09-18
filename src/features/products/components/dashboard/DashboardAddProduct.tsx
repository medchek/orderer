import { STATUS_CONFLICT } from "@/lib/constants";

import { useStore } from "@/store";

import { usePostProduct } from "../../api/postProduct";
import { ProductFormSuccessSubmitData } from "../../types";
import DashboardProductFormModal from "./DashboardProductFormModal";

interface Props {
  closeModal: () => void;
}

export default function DashboardAddProduct({ closeModal }: Props) {
  const { showSnackbar } = useStore();

  const { isLoading: isPostingProduct, mutate: productMutation } =
    usePostProduct({
      onError: (error) => {
        const status = error.response.status;
        let errorMsg =
          "Une erreur est survenu lors de la création du produit, veuillez réessayer";
        if (status === STATUS_CONFLICT) {
          errorMsg = "Un produit avec ce nom existe déjà";
        }
        showSnackbar(errorMsg, "error");
      },
    });

  const onFormSubmit = (data: ProductFormSuccessSubmitData) => {
    productMutation(data);
  };

  return (
    <DashboardProductFormModal
      onSubmit={onFormSubmit}
      closeModal={closeModal}
      isLoading={isPostingProduct}
    />
  );
}
