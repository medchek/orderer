"use client";
import React from "react";
import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubCategory } from "@/lib/clientApiHelpers";
import { useStore } from "@/store";
import { GetCategoriesSuccessResponsePayload } from "@/types/api";
import { klona } from "klona/json";

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

  const { isLoading, mutate } = useMutation({
    mutationKey: ["subCategories", category.id],
    mutationFn: postSubCategory,
    onError: () => {
      showSnackbar(
        "Une érreur est survenu lors de la création de la sous-catégorie, veuillez reéssayer",
        "error"
      );
    },
    onSuccess: (data) => {
      const categories =
        queryClient.getQueryData<GetCategoriesSuccessResponsePayload>([
          "categories",
        ]);

      if (categories) {
        const categoriesCopy = klona(categories);
        const categoryIndex = categoriesCopy.findIndex(
          (cat) => cat.id === category.id
        );
        if (categoryIndex !== -1) {
          // clone the sub categories for immutable modification
          const subcategories = klona(
            categoriesCopy[categoryIndex].subCategories
          );
          // if there are subcategories, just add the data to it, otherwise, create a new array with
          // the newly added subcategory in it
          const newSubcategories = subcategories
            ? [...subcategories, data]
            : [data];
          // set the subcategories
          categoriesCopy[categoryIndex].subCategories = newSubcategories;
        }
        queryClient.setQueryData<GetCategoriesSuccessResponsePayload>(
          ["categories"],
          categoriesCopy
        );
        showSnackbar("Sous-catégorie ajouté!", "default");
        closeModal();
      }
    },
  });

  const onFormSubmit: SubmitHandler<AddSubCategoryFieldValues> = (data) => {
    const { name } = data;
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
