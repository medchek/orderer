import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";
import { FileMetaData, ProductFormValues } from "../../types";
import DashboardImageInputLabel from "./DashboardImageInputLabel";
import DashboardPreviewUploadedProduct from "./DashboardPreviewUploadedProduct";
import { MAX_UPLOAD_FILE_SIZE } from "@/lib/constants";

import { usePostImage } from "@/features/images/api/postImage";
import { klona } from "klona/json";
import { getImageDirectUrl } from "@/lib/utils";
import { useStore } from "@/store";

interface Props {
  uploadState: (FileMetaData | null)[];
  setUploadState: Dispatch<SetStateAction<(FileMetaData | null)[]>>;
}

export default function DashboardImageUpload({
  uploadState,
  setUploadState,
}: Props) {
  const {
    register,
    setError,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setIsUploadingImage } = useStore();

  const notNullImages = useMemo(() => {
    return uploadState.filter((v) => v !== null) as FileMetaData[]; // negate the null values
  }, [uploadState]);

  const { mutate: postImageMutation, isPending: isUploadingImage } =
    usePostImage({
      onSuccess: ({ data, index }) => {
        const targetState = uploadState[index];
        if (targetState) {
          URL.revokeObjectURL(targetState.url);
          const updatedState: FileMetaData = {
            ...targetState,
            imageId: data.id,
            url: getImageDirectUrl(data.id),
            status: "success",
          };
          updateState({ index, data: updatedState });
        }
      },
      onError: (_, fnArgs) => {
        const { index } = fnArgs;
        const targetState = uploadState[index];
        if (targetState) {
          const updatedState: FileMetaData = {
            ...targetState,
            status: "error",
          };
          updateState({ index, data: updatedState });
        }
      },
    });

  useEffect(() => {
    setIsUploadingImage(isUploadingImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploadingImage]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            f !== null &&
            f.file.name === file.name &&
            f.file.size === file.size &&
            f.file.type === file.type
          );
        });
        // if the file does not exists
        if (fileIndex === -1) {
          // find the first index that is null in order to insert the file to it
          const firstNullIndex = uploadState.findIndex((f) => f === null);
          if (firstNullIndex === -1) return;

          postImageMutation({ imageFile: file, index: firstNullIndex });

          updateState({
            index: firstNullIndex,
            data: {
              file,
              status: "uploading",
              url: URL.createObjectURL(file),
              imageId: null,
            },
          });
        }
      }
    }
  };

  /**
   * Udates uploadState immutably, revoking existing url objects before setting the new array
   * @param data The new data
   * @param index The index at which the data should be set
   */
  const updateState = ({
    data,
    index,
  }: {
    data: FileMetaData | null;
    index: number;
  }) => {
    setUploadState((prevState) => {
      // revoke all the urls before copying the state
      prevState.forEach((file) => {
        if (file) URL.revokeObjectURL(file.url);
      });
      // copy new state
      const newState = klona(uploadState);
      newState[index] = data;
      return newState;
    });
  };

  const removeImage = (i: number) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    updateState({
      data: null,
      index: i,
    });
  };

  const retryUpload = (index: number) => {
    const metadata = uploadState[index];
    if (metadata) {
      postImageMutation({
        imageFile: metadata.file,
        index,
      });
      updateState({
        index,
        data: {
          ...metadata,
          status: "uploading",
        },
      });
    }
  };

  return (
    <section id="images-upload">
      <p className="mb-2 text-lg font-semibold dark:text-stone-100">Images</p>

      <div
        id="images-display"
        className="flex h-56 w-full grow gap-4 overflow-x-auto dark:[color-scheme:dark]"
      >
        {notNullImages.length > 0 &&
          uploadState.map((metadata, i) =>
            !metadata ? null : (
              <DashboardPreviewUploadedProduct
                url={metadata.url}
                uploadStatus={metadata.status}
                removeImage={() => removeImage(i)}
                retryUpload={() => {
                  retryUpload(i);
                }}
                key={metadata.url}
              />
            ),
          )}

        {notNullImages.length < 5 && (
          <DashboardImageInputLabel
            htmlFor="image-upload-input"
            count={notNullImages.length}
          />
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
      <p className="text-sm text-red-500">{errors.images?.message}</p>
    </section>
  );
}
