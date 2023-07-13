import { PostImageSuccessResponsePayload } from "@/types/api";

export const postImage = async (imageFile: File) => {
  const fromData = new FormData();
  fromData.append("image", imageFile);

  try {
    const response = await fetch("/api/images", {
      method: "POST",
      body: fromData,
    });
    const data = await response.json();

    if (response.status === 201) {
      return {
        status: response.status,
        data: data as PostImageSuccessResponsePayload,
      };
    } else {
      return {
        status: response.status,
      };
    }
  } catch (e) {
    throw e;
  }
};
