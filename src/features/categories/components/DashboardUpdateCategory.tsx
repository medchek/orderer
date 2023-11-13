import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";

import { SubmitHandler, useForm } from "react-hook-form";
import { klona } from "klona/json";
import { GetCategoriesSuccessResponse } from "../api/getCategories";
import { usePatchCategory } from "../api/patchCategory";
import { queryKeys } from "@/lib/queryKeys";
import { usePatchSubcategory } from "../api/patchSubcategory";

type Props = {
  closeModal: () => void;
  editData: CategoryDataOpen;
};

interface UpdateCategoryFormValues {
  name: string;
}

export default function DashboardUpdateCategory({
  closeModal,
  editData: { code, name: currentName, type },
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryFormValues>();
  // patch requests for categories api route
  const { isPending: isCategoryLoading, mutate: patchCategoryMutation } =
    usePatchCategory({
      onSuccess: (data) => {
        const { code, name: newName } = data;
        const categories =
          queryClient.getQueryData<GetCategoriesSuccessResponse>(
            queryKeys.categories.all.queryKey,
          );
        if (!categories) return;

        const newCategories = klona(categories);

        const catIndex = newCategories.findIndex((c) => c.code === code);

        if (catIndex > -1) {
          newCategories[catIndex].name = newName;
        }
        queryClient.setQueryData<GetCategoriesSuccessResponse>(
          queryKeys.categories.all.queryKey,
          newCategories,
        );
        showSnackbar("Catégorie modifiée avec succès", "default");
        closeModal();
      },
      onError: () => {
        showSnackbar(
          `Une érreur est survenu lors la suppression de la categorie`,
          "error",
        );
      },
    });
  // patch requests for subcategories api route

  const { isPending: isSubcategoryLoading, mutate: patchSubcategoryMutation } =
    usePatchSubcategory({
      onSuccess: (data) => {
        const { code: id, name: newName, categoryCode: categoryId } = data;
        const categories =
          queryClient.getQueryData<GetCategoriesSuccessResponse>([
            queryKeys.categories.all.queryKey,
          ]);
        if (!categories) return;

        const newCategories = klona(categories);

        const categoryIndex = newCategories.findIndex(
          (c) => c.code === categoryId,
        );
        if (categoryIndex > -1) {
          const newSubcategories =
            klona(newCategories[categoryIndex].subCategories) ?? [];
          const subcategoryIndex = newSubcategories.findIndex(
            (subcat) => subcat.code === id,
          );

          if (subcategoryIndex > -1) {
            newSubcategories[subcategoryIndex].name = newName;
          }
          newCategories[categoryIndex].subCategories = newSubcategories;
        }

        queryClient.setQueryData<GetCategoriesSuccessResponse>(
          queryKeys.categories.all.queryKey,
          newCategories,
        );

        showSnackbar("Sous-catégorie modifiée avec succès", "default");
        closeModal();
      },
      onError: () => {
        showSnackbar(
          `Une érreur est survenu lors la suppression de la sous-catégorie`,
          "error",
        );
      },
    });

  const validate = (value: string) => {
    const newCategoryName = value.trim();
    if (!newCategoryName) {
      return "Ce champ est obligatoire";
    }
    if (newCategoryName.length < 3 || newCategoryName.length > 200) {
      return "Le nom de la catégorie doit être entre 3 et 200 caratères";
    }
    if (newCategoryName === currentName) {
      return "Aucune modification n'a été apportée";
    }
  };

  const onFormSubmit: SubmitHandler<UpdateCategoryFormValues> = (data) => {
    const body = {
      code,
      name: data.name,
    };
    if (type === "category") {
      patchCategoryMutation(body);
    } else {
      patchSubcategoryMutation(body);
    }
  };

  return (
    <DashbarodCategoryModal<UpdateCategoryFormValues>
      isLoading={isCategoryLoading || isSubcategoryLoading}
      closeModal={closeModal}
      defaultValue={currentName}
      handleSubmit={handleSubmit(onFormSubmit, (err) => {
        console.error("[Form Error] error updating category", err);
      })}
      inputName="name"
      register={register}
      registerRules={{
        required: "Ce champ est obligatoire",
        validate,
      }}
      error={errors.name?.message}
      label={`Modifier une ${
        type === "category" ? "catégorie" : "sous-catégorie"
      }`}
      inputPlaceholder={`Nouveau nom de la  ${
        type === "category" ? "catégorie" : "sous-catégorie"
      }`}
    />
  );
}
