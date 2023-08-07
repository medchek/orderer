import React from "react";
import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryDataOpen } from "@/store/dashboardSlice";
import { deleteCategory } from "@/lib/clientApiHelpers";
import { GetCategoriesSuccessResponsePayload } from "@/types/api";
import { klona } from "klona/json";
import { useStore } from "@/store";
import DashboardDeleteConfirm from "../DashboardDeleteConfirm";

type Props = {
  closeModal: () => void;
  deleteData: CategoryDataOpen;
};

export default function DashboardDeleteCategory({
  closeModal,
  deleteData: { id, name, type },
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();
  // delete requests
  const { isLoading, mutate: deleteCategoryMutation } = useMutation({
    mutationKey: [
      type === "category" ? "categories" : "subcategories",
      "delete",
      id,
    ],
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      const { id, type } = data;
      const categories =
        queryClient.getQueryData<GetCategoriesSuccessResponsePayload>([
          "categories",
        ]);

      if (categories) {
        if (type === "category") {
          // remove the deleted category

          const newCategories = categories.filter((cat) => cat.id !== id);
          queryClient.setQueryData<GetCategoriesSuccessResponsePayload>(
            ["categories"],
            newCategories
          );
        } else {
          // handle delete subcategory
          const newCategories = klona(categories);

          for (const category of newCategories) {
            if (category.subCategories) {
              const subcategories = category.subCategories;
              // if the subcategories contain the id returned by onSuccess
              const idIndex = subcategories.findIndex(
                (subcat) => subcat.id === id
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
          queryClient.setQueryData<GetCategoriesSuccessResponsePayload>(
            ["categories"],
            newCategories
          );
        }

        showSnackbar(
          `${type === "category" ? "Catégorie" : "Sous catégorie"} supprimée`,
          "default"
        );
        closeModal();
      }
    },
    onError: () => {
      const text = type === "category" ? "categorie" : "sous catégorie";
      showSnackbar(
        `Une érreur est survenu lors la suppression de la ${text}`,
        "error"
      );
    },
  });

  return (
    <DashboardDeleteConfirm
      closeModal={closeModal}
      onConfirm={() =>
        deleteCategoryMutation({
          id: id,
          type: type,
        })
      }
      label={`Supprimer une ${
        type === "category" ? "catégorie" : "sous catégorie"
      }`}
      text={`Êtes-vous sûr de vouloir supprimer la ${
        type === "category" ? "catégorie" : "sous catégorie"
      } ${name}. ${
        type === "category"
          ? "Cela aussi supprimera toute sous-catégorie liée à celle-ci."
          : ""
      }`}
      isLoading={isLoading}
    />
  );
}
