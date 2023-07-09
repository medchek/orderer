export type UploadStatus = "error" | "uploading" | "success";

export interface FileMetaData {
  id: string | null;
  file: File;
  status: UploadStatus;
  url: string;
}

export type SnackType = "default" | "error" | "success" | "warning";
