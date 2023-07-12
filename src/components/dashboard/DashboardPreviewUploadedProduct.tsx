import React from "react";
import { MdClear } from "react-icons/md";
import Loader from "../Loader";
import { TbRefresh } from "react-icons/tb";
import { UploadStatus } from "@/types/components";

interface Props {
  removeImage: () => void;
  uploadStatus: UploadStatus;
  url: string;
  retryUpload: () => void;
}

export default function DashboardPreviewUploadedProduct({
  uploadStatus,
  removeImage,
  retryUpload,
  url,
}: Props) {
  return (
    <div className="relative flex aspect-square h-full min-h-full w-56 min-w-[14rem] items-center justify-center  overflow-hidden rounded-xl">
      <img
        src={url}
        alt="Image produit"
        className={`h-full w-full object-cover ${
          uploadStatus !== "success" && "blur-sm "
        }`}
        loading="lazy"
      />
      {/* Overlay */}
      {uploadStatus === "error" && (
        <div className="absolute left-0 top-0 h-full w-full bg-red-600 opacity-50"></div>
      )}

      {/* Uploading loader */}
      {uploadStatus === "uploading" && (
        <div
          className="absolute flex h-12 w-12  items-center justify-center rounded-md bg-[#dcdff1]  shadow-md"
          title="Upload en cours"
        >
          <Loader className="h-8 w-8 border-4 border-card-dark" />
        </div>
      )}
      {/* Retry button */}
      {uploadStatus === "error" && (
        <button
          className="absolute flex h-12 w-12  items-center justify-center rounded-md bg-[#dcdff1] text-card-dark shadow-lg transition-colors focus:bg-[#c0c3d6]"
          title="Réessayer"
          type="button"
          onClick={() => retryUpload()}
        >
          <TbRefresh className="h-8 w-8  text-card-dark" />
        </button>
      )}

      {/* Remove button */}
      {uploadStatus !== "uploading" && (
        <button
          type="button"
          className="absolute right-2 top-2 h-6 w-6 rounded-md bg-[#dcdff1] text-card-dark shadow-lg transition-colors focus:bg-[#c0c3d6]"
          onClick={() => removeImage()}
        >
          <MdClear className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
