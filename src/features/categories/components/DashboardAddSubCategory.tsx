"use client";
import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";
import { klona } from "klona/json";
import { usePostSubcategory } from "../api/postSubcategory";
import { GetCategoriesSuccessResponse } from "../api/getCategories";
import { queryKeys } from "@/lib/queryKeys";
import { STATUS_CONFLICT } from "@/lib/constants";

interface AddSubCategoryFieldValues {
  name: string;
}
interface Props {
  category: { id: number; name: string };
  closeModal: () => void;
}

export default function DashboardAddSubCategory({
  closeModal,
  category,
}: Props) {
  const { showSnackbar } = useStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSubCategoryFieldValues>();

  const validateInput = (rawValue: string) => {
    const value = rawValue.trim();
    if (value.length < 3 || value.length > 200) {
      return "Le nom de la catégorie doit être entre 3 et 200 caratères";
    }
  };

  const { isLoading, mutate } = usePostSubcategory({
    onError: (error, vars) => {
      const status = error.response.status;

      const categoryData =
        queryClient.getQueryData<GetCategoriesSuccessResponse>(
          queryKeys.categories.all.queryKey,
        );
      const categoryName =
        categoryData?.find((cat) => cat.id === vars.categoryId)?.name ??
        "sélectionnée";

      let errorMsg =
        "Une érreur est survenu lors de la création de la sous-catégorie, veuillez reéssayer";
      if (status === STATUS_CONFLICT) {
        errorMsg = `Une sous-catégorie avec çe nom exists déjà pour la catégorie ${categoryName}`;
      }

      showSnackbar(errorMsg, "error");
    },
    onSuccess: (data) => {
      const categories = queryClient.getQueryData<GetCategoriesSuccessResponse>(
        queryKeys.categories.all.queryKey,
      );

      if (categories) {
        const categoriesCopy = klona(categories);
        const categoryIndex = categoriesCopy.findIndex(
          (cat) => cat.id === category.id,
        );
        if (categoryIndex !== -1) {
          // clone the sub categories for immutable modification
          const subcategories = klona(
            categoriesCopy[categoryIndex].subCategories,
          );
          // if there are subcategories, just add the data to it, otherwise, create a new array with
          // the newly added subcategory in it
          const newSubcategories = subcategories
            ? [...subcategories, data]
            : [data];
          // set the subcategories
          categoriesCopy[categoryIndex].subCategories = newSubcategories;
        }
        queryClient.setQueryData<GetCategoriesSuccessResponse>(
          queryKeys.categories.all.queryKey,
          categoriesCopy,
        );
        showSnackbar("Sous-catégorie ajouté!", "default");
        closeModal();
      }
    },
  });

  const onFormSubmit: SubmitHandler<AddSubCategoryFieldValues> = (data) => {
    const { name } = data;

    // check if the subcategory name already exists
    const categories = queryClient.getQueryData<GetCategoriesSuccessResponse>(
      queryKeys.categories.all.queryKey,
    );
    if (categories) {
      const subcategories = categories.find((cat) => cat.id === category.id)
        ?.subCategories;

      if (subcategories) {
        for (const subcat of subcategories) {
          if (subcat.name.toLowerCase() === name.toLowerCase()) {
            return showSnackbar(
              "Sous-catégorie déjà exists pour cette catégorie!",
              "error",
            );
          }
        }
      }
    }

    mutate({ categoryId: category.id, name });
  };

  return (
    <DashbarodCategoryModal<AddSubCategoryFieldValues>
      label="Ajouter une sous-catégorie"
      inputPlaceholder={`Ajouter une sous-catégorie pour ${category.name}`}
      register={register}
      registerRules={{
        required: "Ce champ est obligatoire",
        validate: validateInput,
      }}
      closeModal={closeModal}
      inputName="name"
      handleSubmit={handleSubmit(onFormSubmit, (err) => {
        console.error("Error submitting sub-category form:", err);
      })}
      error={errors.name?.message}
      isLoading={isLoading}
    />
  );
}
