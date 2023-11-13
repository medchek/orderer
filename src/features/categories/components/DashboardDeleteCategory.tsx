import { useQueryClient } from "@tanstack/react-query";
import { CategoryDataOpen } from "@/store/dashboardSlice";
import { klona } from "klona/json";
import { useStore } from "@/store";

import { queryKeys } from "@/lib/queryKeys";
import { useDeleteCategory } from "../api/deleteCategory";
import DashboardDeleteConfirm from "@/components/dashboard/DashboardDeleteConfirm";
import { GetCategoriesSuccessResponse } from "../api/getCategories";

type Props = {
  closeModal: () => void;
  deleteData: CategoryDataOpen;
};

export default function DashboardDeleteCategory({
  closeModal,
  deleteData: { code: id, name, type },
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();
  // delete requests
  const { isPending, mutate: deleteCategoryMutation } = useDeleteCategory({
    onSuccess: (data) => {
      const { code, type } = data;
      const categories = queryClient.getQueryData<GetCategoriesSuccessResponse>(
        queryKeys.categories.all.queryKey,
      );

      if (categories) {
        if (type === "category") {
          // remove the deleted category

          const newCategories = categories.filter((cat) => cat.code !== code);
          queryClient.setQueryData<GetCategoriesSuccessResponse>(
            queryKeys.categories.all.queryKey,
            newCategories,
          );
        } else {
          // handle delete subcategory
          const newCategories = klona(categories);

          for (const category of newCategories) {
            if (category.subCategories) {
              const subcategories = category.subCategories;
              // if the subcategories contain the id returned by onSuccess
              const idIndex = subcategories.findIndex(
                (subcat) => subcat.code === code,
              );

              if (idIndex > -1) {
                // delete the subcategory in case the index was found
                const newSubcategories = [
                  ...subcategories.slice(0, idIndex),
                  ...subcategories.slice(idIndex + 1),
                ];
                category.subCategories = newSubcategories;
                // break the loop
                break;
              }
            }
          }
          // set the new data with the deleted subcategory
          queryClient.setQueryData<GetCategoriesSuccessResponse>(
            queryKeys.categories.all.queryKey,
            newCategories,
          );
        }

        showSnackbar(
          `${type === "category" ? "Catégorie" : "Sous-catégorie"} supprimée`,
          "default",
        );
        closeModal();
      }
    },
    onError: () => {
      const text = type === "category" ? "categorie" : "sous-catégorie";
      showSnackbar(
        `Une érreur est survenu lors la suppression de la ${text}`,
        "error",
      );
    },
  });

  return (
    <DashboardDeleteConfirm
      closeModal={closeModal}
      onConfirm={() =>
        deleteCategoryMutation({
          code: id,
          type: type,
        })
      }
      label={`Supprimer une ${
        type === "category" ? "catégorie" : "sous-catégorie"
      }`}
      text={`Êtes-vous sûr de vouloir supprimer la ${
        type === "category" ? "catégorie" : "sous-catégorie"
      } ${name}. ${
        type === "category"
          ? "Cela aussi supprimera toute sous-catégorie liée à celle-ci."
          : ""
      }`}
      isLoading={isPending}
    />
  );
}
