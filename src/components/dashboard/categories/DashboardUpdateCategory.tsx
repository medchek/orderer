import React from "react";
import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";
import {
  GetCategoriesSuccessResponsePayload,
  PatchCategorySuccessResponsePayload,
} from "@/types/api";
import { PatchSubcategory, patchCategory } from "@/lib/clientApiHelpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { klona } from "klona/json";

type Props = {
  closeModal: () => void;
  editData: CategoryDataOpen;
};

interface UpdateCategoryFormValues {
  name: string;
}

export default function DashboardUpdateCategory({
  closeModal,
  editData: { id, name: currentName, type },
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryFormValues>();
  // patch requests for categories api route
  const { isLoading: isCategoryLoading, mutate: patchCategoryMutation } =
    useMutation({
      mutationKey: ["categories", "patch", id],
      mutationFn: patchCategory,
      onSuccess: (data) => {
        const { id, name: newName } = data;
        const categories =
          queryClient.getQueryData<GetCategoriesSuccessResponsePayload>([
            "categories",
          ]);
        if (!categories) return;

        const newCategories = klona(categories);

        const catIndex = newCategories.findIndex((c) => c.id === id);

        if (catIndex > -1) {
          newCategories[catIndex].name = newName;
        }
        queryClient.setQueryData<GetCategoriesSuccessResponsePayload>(
          ["categories"],
          newCategories
        );
        showSnackbar("Catégorie modifiée avec succès", "default");
        closeModal();
      },
      onError: () => {
        showSnackbar(
          `Une érreur est survenu lors la suppression de la categorie`,
          "error"
        );
      },
    });
  // patch requests for subcategories api route

  const { isLoading: isSubcategoryLoading, mutate: patchSubcategoryMutation } =
    useMutation({
      mutationKey: ["subcategories", "patch", id],
      mutationFn: PatchSubcategory,
      onSuccess: (data) => {
        const { id, name: newName, categoryId } = data;
        const categories =
          queryClient.getQueryData<GetCategoriesSuccessResponsePayload>([
            "categories",
          ]);
        if (!categories) return;

        const newCategories = klona(categories);

        const categoryIndex = newCategories.findIndex(
          (c) => c.id === categoryId
        );
        if (categoryIndex > -1) {
          const newSubcategories =
            klona(newCategories[categoryIndex].subCategories) ?? [];
          const subcategoryIndex = newSubcategories.findIndex(
            (subcat) => subcat.id === id
          );

          if (subcategoryIndex > -1) {
            newSubcategories[subcategoryIndex].name = newName;
          }
          newCategories[categoryIndex].subCategories = newSubcategories;
        }

        queryClient.setQueryData<GetCategoriesSuccessResponsePayload>(
          ["categories"],
          newCategories
        );

        showSnackbar("Sous catégorie modifiée avec succès", "default");
        closeModal();
      },
      onError: () => {
        showSnackbar(
          `Une érreur est survenu lors la suppression de la sous catégorie`,
          "error"
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
      id,
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
        type === "category" ? "catégorie" : "sous catégorie"
      }`}
      inputPlaceholder={`Nouveau nom de la  ${
        type === "category" ? "catégorie" : "sous catégorie"
      }`}
    />
  );
}
