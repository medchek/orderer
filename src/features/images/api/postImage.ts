import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

export interface PostImageSuccessResponse {
  id: string;
  originalName: string;
  originalSize: number;
}

/**
 * Uploads an image to the server
 * @param imageFile The image file instance
 */
export const postImage = async (
  imageFile: File,
): Promise<PostImageSuccessResponse> => {
  const fromData = new FormData();
  fromData.append("image", imageFile);

  return await ky
    .post("/api/images", {
      body: fromData,
    })
    .json();
};

type PostImageAtIndexArgs = {
  imageFile: File;
  index: number;
};

type PostImageAtIndexReturnData = {
  /** The uploaded file data returned by the server, containing the image id */
  data: PostImageSuccessResponse;
  /** The index of the image in the client component */
  index: number;
};

/**
 * Uplads an image file to the server maintaining the index at which the image was in the client uploader component state
 * @param imageFile the image to upload
 * @param index the index of the image within the client component
 * @returns the uploaded image data as well as the index
 */
const postImageAtIndex = async ({
  imageFile,
  index,
}: PostImageAtIndexArgs): Promise<PostImageAtIndexReturnData> => {
  const data = await postImage(imageFile);

  return {
    data,
    index,
  };
};

type UsePostImageOptions = UseMutationOptions<
  PostImageAtIndexReturnData,
  HTTPError,
  PostImageAtIndexArgs,
  unknown
>;

export const usePostImage = (opts?: UsePostImageOptions) => {
  return useMutation({
    mutationFn: postImageAtIndex,
    ...opts,
  });
};

