import React, { ChangeEvent, useRef, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus } from "react-icons/tb";
import Textarea from "../Textarea";
import { addProductValidators } from "@/lib/formValidators";
import DashboardPreviewUploadedProduct from "./DashboardPreviewUploadedProduct";
import { FileMetaData, UploadStatus } from "@/types/components";
import { postImage } from "@/lib/clientApiHelpers";
import {
  MAX_UPLOAD_FILE_SIZE,
  STATUS_CONFLICT,
  STATUS_CREATED,
} from "@/lib/constants";
import {
  PostProductBodyPayload,
  PostProductSuccessResponsePayload,
} from "@/types/api";
import { toNumber, toNumberOrNull } from "@/lib/utils";
import Loader from "../Loader";
import { useStore } from "@/store";

interface Props {
  closeModal: () => void;
}

export interface AddProductFormValues {
  name: string;
  price: string;
  description: string;
  stock: string;
  categoryId: string;
  discount: string;
  images: string;
}

export default function DashboardAddProduct({ closeModal }: Props) {
  const methods = useForm<AddProductFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const [uploadState, setUploadState] = useState<FileMetaData[]>([]);

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const { showSnackbar, addProduct } = useStore();

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const files = e.target.files;
      if (files) {
        const file = files[0];

        if (file.size > MAX_UPLOAD_FILE_SIZE) {
          return setError("images", {
            message: "La taille de l'image ne peut pas excéder 8mb",
          });
        }
        // only add the file if it hasn't been added yet
        const fileIndex = uploadState.findIndex((f) => {
          return (
            f.file.name === file.name &&
            f.file.size === file.size &&
            f.file.type === file.type
          );
        });

        if (fileIndex === -1) {
          // upload the file to the server
          const fromData = new FormData();
          fromData.append("image", file);

          setUploadState((prevState) => [
            ...prevState,
            {
              imageId: null,
              file,
              status: "uploading",
              url: URL.createObjectURL(file),
            },
          ]);
          try {
            const { status, data } = await postImage(file);

            updateUploadStateByFile(
              file,
              status === 201 ? "success" : "error",
              data?.id // will be available in case of a 201 status
            );
          } catch (error) {
            // error handling
            updateUploadStateByFile(file, "error");

            console.error("Error uploading file: ", error);
          }
        }
      }
    }
  };

  const removeImage = (i: number) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploadState((prevState) =>
      prevState.filter((data, idx) => {
        if (idx === i) {
          // revoke the url object before deleting it
          data.file = {} as File;
          URL.revokeObjectURL(data.url);
          // and dont include it
          return false;
        } else {
          return true;
        }
      })
    );
  };

  const retryUpload = async (i: number) => {
    const file = uploadState[i].file;
    const fromData = new FormData();

    fromData.append("image", file);

    updateUploadStateByIndex(i, "uploading");
    try {
      const { status, data } = await postImage(file);
      updateUploadStateByIndex(
        i,
        status === 201 ? "success" : "error",
        data?.id // will be available in case of a 201 status
      );
    } catch (e) {
      updateUploadStateByIndex(i, "error");
      console.error("Error retrying upload:", e);
    }
  };

  /**
   * Updates the uploadState uploading status by index
   * @param i the index of the target file to be updated
   * @param status the uploading status
   * @param uploadedImageId? file id returned by the server
   */
  const updateUploadStateByIndex = (
    i: number,
    status: UploadStatus,
    uploadedImageId?: string
  ) => {
    setUploadState((prevState) =>
      prevState.map((metadata, idx) => {
        if (i === idx) {
          const newMetadata = { ...metadata };
          // if the id is provided from a successfuly response, add it
          if (uploadedImageId) newMetadata.imageId = uploadedImageId;
          newMetadata.status = status;
          return newMetadata;
        }
        return metadata;
      })
    );
  };
  /**
   * Updates the uploadState uploading status by file
   * @param file file to be used to look for the same metadata inside the uploadState state
   * @param status the uploading status
   * @param uploadedImageId? file id returned by the server
   */
  const updateUploadStateByFile = (
    file: File,
    status: UploadStatus,
    uploadedImageId?: string
  ) => {
    setUploadState((prevState) =>
      prevState.map((f) => {
        if (
          f.file.name === file.name &&
          f.file.size === file.size &&
          f.file.type === file.type
        ) {
          const newMetadata = { ...f };
          // if the id is provided from a successfuly response, add it
          if (uploadedImageId) newMetadata.imageId = uploadedImageId;
          newMetadata.status = status;
          return newMetadata;
        }
        return f;
      })
    );
  };

  const cancel = async () => {
    const res = fetch("/api/images", {
      method: "DELETE",
      body: "cancel-from",
    });
  };

  const isUploading = () => {
    return uploadState.some((v) => v.status === "uploading");
  };

  const validateImagesInput = () => {
    let message = "";
    if (uploadState.length <= 0 || uploadState.length > 5) {
      message = "Veuillez selectionner une image pour votre produit";
    }
    // check if all images were successfully uploaded
    const isAllSuccessfulUpload = uploadState.every(
      (i) => i.status === "success"
    );
    if (!isAllSuccessfulUpload) {
      message = "Certaines images n'ont pas été correctement uploadées";
    }
    setError("images", {
      message,
    });
    return message;
  };

  const onFormSubmit: SubmitHandler<AddProductFormValues> = async (data, e) => {
    e?.preventDefault();
    // reset the error before rechecking
    if (validateImagesInput() !== "") {
      return;
    }

    const images = uploadState
      .filter((data) => data.imageId !== null)
      .map((data) => data.imageId as string);

    const { categoryId, description, discount, name, price, stock } = data;

    const apiPayload: PostProductBodyPayload = {
      categoryId: toNumberOrNull(categoryId),
      description,
      discount: toNumber(discount),
      name,
      price: toNumber(price),
      stock: toNumberOrNull(stock),
      images,
      // "1dupDHrNHiwoa8GDPIu-7wyFGEShPb28C",
      // "1qSVyEeLMHdKh7q_hixBNsy-edF5ndAdv",
    };
    try {
      setIsFormSubmitting(true);
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(apiPayload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const productData: PostProductSuccessResponsePayload =
        await response.json();
      const status = response.status;
      if (status === STATUS_CREATED) {
        addProduct(productData);
        showSnackbar("Produit ajouté!", "success");
        closeModal();
      } else if (status === STATUS_CONFLICT) {
        // conflict, name already exists

        return setError("name", {
          message: "Un produit avec ce nom existe déjà",
        });
      } else {
        showSnackbar("Une erreur est survenu, veuillez réessayer", "error");
      }
    } catch (error) {
      console.error("Error submitting product form:", error);
      showSnackbar("Une erreur est survenu, veuillez réessayer", "error");
    } finally {
      setIsFormSubmitting(false);
    }

    console.log("submitting");
  };

  return (
    <Modal
      className="flex h-full flex-col  rounded-lg  bg-[#F3F3F3] px-8 py-5 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeModal={closeModal}
      label="Ajouter un Produit"
    >
      <form
        encType="multipart/form-data"
        className="flex h-full w-full flex-col justify-between overflow-auto"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting form:", err);
        })}
      >
        <section
          id="dashboard-add-product-form"
          className="flex h-full w-full grow flex-col justify-between  overflow-y-auto px-2 pt-5"
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
              error={errors["name"]?.message as string}
              placeholder="Nom du produit"
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
                error={errors["price"]?.message as string}
              />
              <Input
                label="Categorie"
                name="categoryId"
                register={register}
                placeholder="Categorie du produit"
              />
            </div>
            <Textarea
              label="Description"
              name="description"
              autoComplete="off"
              register={register}
              placeholder="Description du produit (optionnel)"
              error={errors["description"]?.message as string}
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
                error={errors["stock"]?.message as string}
                placeholder="Nombre de produits en stock (optionnel)"
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
                error={errors["discount"]?.message as string}
                placeholder="Pourcentage de réduction (optionnel)"
              />
            </div>

            <section id="images-upload">
              <p className="mb-2 text-lg font-semibold dark:text-stone-100">
                Images
              </p>

              <div
                id="images-display"
                className="flex h-56 w-full grow gap-4 overflow-x-auto dark:[color-scheme:dark]"
              >
                {uploadState.length > 0 &&
                  uploadState.map(({ status, url }, i) => (
                    <DashboardPreviewUploadedProduct
                      url={url}
                      uploadStatus={status}
                      removeImage={() => removeImage(i)}
                      retryUpload={() => retryUpload(i)}
                      key={url}
                    />
                  ))}

                {uploadState.length < 5 && (
                  <label
                    className="flex aspect-square w-56 cursor-pointer flex-col items-center justify-center rounded-xl transition-all  dark:bg-[#17181D] dark:hover:bg-slate-200/20 dark:focus:bg-white/5"
                    title="Ajouter une image"
                    htmlFor="image-upload-input"
                  >
                    <TbPhotoPlus className="h-12 w-12 text-stone-400" />
                    <p className="text-sm text-stone-400">
                      {uploadState.length}/5
                    </p>
                  </label>
                )}
                {/* IMAGE INPUIT */}
                <input
                  type="file"
                  hidden
                  id="image-upload-input"
                  accept="image/png, image/jpeg, image/webp, image/avif, image/tiff"
                  {...register("images", {
                    onChange: handleImageSelect,
                  })}
                  ref={fileInputRef}
                />
              </div>
              <p className="text-sm text-red-500">
                {errors?.["images"]?.message as string}
              </p>
            </section>
          </section>
        </section>
        <section
          id="form-buttons"
          className="mt-2 flex h-12 min-h-[3rem] items-center justify-end gap-4"
        >
          <button
            type="button"
            className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="h-10 w-36 rounded-md font-bold transition-colors disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 dark:bg-card-dark dark:text-white dark:hover:bg-[#242436] dark:focus:bg-[#0c0c13] disabled:dark:bg-stone-600"
            disabled={isUploading()}
            // disabled
          >
            {isFormSubmitting ? (
              <Loader className="h-6 w-6" />
            ) : (
              <span>Ajouter</span>
            )}
          </button>
        </section>
      </form>
    </Modal>
  );
}