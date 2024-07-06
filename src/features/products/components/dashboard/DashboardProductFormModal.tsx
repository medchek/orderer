import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ProductFormValues,
  FileMetaData,
  Product,
  ProductFormSuccessSubmitData,
} from "../../types";
import Modal from "@/components/Modal";
import { addProductValidators } from "@/lib/formValidators";
import CategorySelect from "@/features/categories/components/CategorySelect";
import Textarea from "@/components/Textarea";
import Input from "@/components/Input";
import DashboardImageUpload from "./DashboardImageUpload";
import { useEffect, useMemo, useState } from "react";
import {
  getImageDirectUrl,
  toNumberOrNull,
  toPositiveNumber,
} from "@/lib/utils";
import ModalActionButtons from "@/components/ModalActionButtons";
import { useStore } from "@/store";
import { parseCategoryOptionValue } from "@/features/categories/utils/parseCategoryOptionValue";
import { generateCategoryOptionValue } from "@/features/categories/utils/generateCategoryOptionValue";
import { useGetCategories } from "@/features/categories/api/getCategories";

interface Props {
  closeModal: () => void;
  /** When productData is supplied, the component will be set to patch/modify product mode instead of product creation */
  productData?: Product;

  isLoading: boolean;
  onSubmit: (data: ProductFormSuccessSubmitData) => void;
}

export default function DashboardProductFormModal({
  isLoading,

  closeModal,
  productData,
  onSubmit,
}: Props) {
  const methods = useForm<ProductFormValues>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const { isUploadingImage } = useStore();
  const { isPending: isCategoriesFetching } = useGetCategories();

  const [uploadState, setUploadState] = useState<(FileMetaData | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  // Handles image presetting when the user is updating the product
  useEffect(() => {
    if (productData && uploadState.every((f) => f !== null)) {
      const { images } = productData;
      if (images.length) {
        // to work immutably
        const newState = [...uploadState];
        // for each image id repace the null value with metadata object
        images.forEach(({ id }, i) => {
          // replace the null value progressively by image data
          newState[i] = {
            file: {},
            imageId: id,
            status: "success",
            url: getImageDirectUrl(id),
          } as FileMetaData;
        });

        setUploadState(newState);
      }
    }
  }, [productData, uploadState]);

  const notNullImages = useMemo(() => {
    return uploadState.filter((v) => v !== null) as FileMetaData[]; // negate the null values
  }, [uploadState]);

  const validateImagesInput = () => {
    let message = "";
    if (notNullImages.length <= 0 || notNullImages.length > 5) {
      message = "Veuillez selectionner une image pour votre produit";
    }
    // check if all images were successfully uploaded
    const isAllSuccessfulUpload = notNullImages.every(
      (i) => i.status === "success",
    );
    if (!isAllSuccessfulUpload) {
      message = "Certaines images n'ont pas été correctement uploadées";
    }
    setError("images", {
      message,
    });
    return message;
  };

  const onFormSubmit: SubmitHandler<ProductFormValues> = async (data, e) => {
    e?.preventDefault();
    // reset the error before rechecking
    if (validateImagesInput() !== "") {
      return validateImagesInput();
    }
    const { category, description, discount, name, price, stock } = data;
    const images = uploadState
      .filter((data): data is FileMetaData => {
        if (!data || !data.imageId) return false;
        else return true;
      })
      .map((data) => data.imageId as string);
    const formData: ProductFormSuccessSubmitData = {
      category: parseCategoryOptionValue(category),
      description: description.trim(),
      discount: toPositiveNumber(discount),
      name: name.trim(),
      price: toPositiveNumber(price),
      stock: toNumberOrNull(stock),
      images,
    };

    onSubmit(formData);
  };

  return (
    <Modal
      className="flex h-full flex-col rounded-lg bg-[#F3F3F3] px-8 py-5 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeModal={closeModal}
      label={`${productData ? "Modifier" : "Ajouter"} un Produit`}
    >
      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          className="flex h-full w-full flex-col justify-between overflow-auto"
          onSubmit={handleSubmit(onFormSubmit, (err) => {
            console.error("Error submitting form:", err);
          })}
        >
          <section
            id="dashboard-add-product-form"
            className="flex h-full w-full grow flex-col justify-between overflow-y-auto px-2 pt-5"
          >
            <section className="flex grow flex-col">
              <Input
                label="Nom du Produit"
                // value="Air max 95" // TODO: REMOVE AFTER TEST
                autoComplete="off"
                name="name"
                register={register}
                registerRules={{
                  required: "Ce champ est obligatoire",
                  validate: addProductValidators.name,
                }}
                error={errors.name?.message as string}
                placeholder="Nom du produit"
                defaultValue={productData?.name}
              />
              <div className="flex w-full grow-0 gap-5">
                <Input
                  type="number"
                  label="Prix"
                  name="price"
                  // value="25000" // TODO: REMOVE AFTER TEST
                  register={register}
                  registerRules={{
                    required: "Ce champ est obligatoire",
                    validate: addProductValidators.price,
                  }}
                  placeholder="Prix du produit"
                  error={errors.price?.message}
                  defaultValue={productData?.price}
                />
                <CategorySelect<ProductFormValues>
                  register={register}
                  error={errors.category?.message}
                  defaultValue={generateCategoryOptionValue(
                    productData?.category?.code,
                    productData?.subCategory?.code,
                  )}
                />
              </div>
              <Textarea
                label="Description"
                name="description"
                autoComplete="off"
                register={register}
                placeholder="Description du produit (optionnel)"
                error={errors.description?.message}
                defaultValue={productData?.description ?? ""}
              />
              <div className="flex w-full grow-0 gap-5">
                <Input
                  type="number"
                  label="Stock"
                  name="stock"
                  min={0}
                  register={register}
                  registerRules={{
                    validate: addProductValidators.stock,
                  }}
                  error={errors.discount?.message}
                  placeholder="Nombre de produits en stock (optionnel)"
                  defaultValue={productData?.stock ?? ""}
                />
                <Input
                  type="number"
                  label="Réduction"
                  name="discount"
                  autoComplete="off"
                  min={0}
                  max={100}
                  register={register}
                  registerRules={{
                    validate: addProductValidators.price,
                  }}
                  error={errors.discount?.message}
                  placeholder="Pourcentage de réduction (optionnel)"
                  defaultValue={
                    productData && productData.discount > 0
                      ? productData?.discount
                      : ""
                  }
                />
              </div>
              <DashboardImageUpload
                setUploadState={setUploadState}
                uploadState={uploadState}
              />
            </section>
          </section>
          <ModalActionButtons
            id="form-buttons"
            className="mt-2 flex h-12 min-h-[3rem] items-center justify-end gap-4"
            confirmText={productData ? "Modifier" : "Ajouter"}
            onCancel={closeModal}
            confirmButtonType="submit"
            disableCancel={isUploadingImage || isLoading}
            disabledSubmit={
              isUploadingImage || isLoading || isCategoriesFetching
            }
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </Modal>
  );
}
