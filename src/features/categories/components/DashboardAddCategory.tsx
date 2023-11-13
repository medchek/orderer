import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { klona } from "klona/json";
import DashbarodCategoryModal from "./DashbarodCategoryModal";
import { STATUS_CONFLICT } from "@/lib/constants";
import { usePostCategory } from "../api/postCategory";
import { GetCategoriesSuccessResponse } from "../api/getCategories";
import { queryKeys } from "@/lib/queryKeys";

interface Props {
  closeModal: () => void;
}

interface AddCategoryFormValues {
  name: string;
}

export default function DashboardAddCategory({ closeModal }: Props) {
  const { showSnackbar } = useStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryFormValues>();

  const { isPending, mutate } = usePostCategory({
    onError: (error) => {
      const status = error.response.status;
      let errorMsg =
        "Une érreur est survenu lors de la création de la catégorie, veuillez reéssayer";
      if (status === STATUS_CONFLICT) {
        errorMsg = "Une Catégorie avec çe nom exists déjà";
      }
      showSnackbar(errorMsg, "error");
    },
    onSuccess: (data) => {
      const currentCategories =
        queryClient.getQueryData<GetCategoriesSuccessResponse>(
          queryKeys.categories.all.queryKey,
        );
      if (!currentCategories) return;
      const newCategories = currentCategories
        ? klona([...currentCategories, data])
        : [data];

      queryClient.setQueryData<GetCategoriesSuccessResponse>(
        queryKeys.categories.all.queryKey,
        newCategories,
      );
      showSnackbar("Catégorie ajouté!", "default");
      closeModal();
    },
  });

  const validateInput = (rawValue: string) => {
    const value = rawValue.trim();
    if (value.length < 3 || value.length > 200) {
      return "Le nom de la catégorie doit être entre 3 et 200 caratères";
    }
  };

  const onFormSubmit: SubmitHandler<AddCategoryFormValues> = (data) => {
    // check if the category already exists
    const categories = queryClient.getQueryData<GetCategoriesSuccessResponse>(
      queryKeys.categories.all.queryKey,
    );

    if (categories) {
      const nameExists = categories.findIndex(
        (c) => c.name.toLowerCase() === data.name.toLowerCase(),
      );
      if (nameExists !== -1) {
        return showSnackbar("Ce nom de catégorie existe déjà", "error");
      }
    }
    mutate(data);
  };

  return (
    <DashbarodCategoryModal<AddCategoryFormValues>
      label="Ajouter une Catégorie"
      inputPlaceholder="Nom de la catégorie"
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
      isLoading={isPending}
    />
  );
}
