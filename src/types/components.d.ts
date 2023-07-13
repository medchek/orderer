export type UploadStatus = "error" | "uploading" | "success";

export interface FileMetaData {
  imageId: string | null;
  file: File;
  status: UploadStatus;
  url: string;
}
