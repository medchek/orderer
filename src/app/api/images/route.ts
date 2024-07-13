import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { apiErrorResponse } from "@/lib/utils";

import sharp from "sharp";
import { getAllFiles } from "@/lib/drive";
import { prisma } from "../../../../prisma/db";
import {
  MAX_UPLOAD_FILE_SIZE,
  STATUS_CONTENT_TOO_LARGE,
  STATUS_UNAUTHORIZED,
  STATUS_UNSUPPORTED_MEDIA_TYPE,
} from "@/lib/constants";
import { PostImageSuccessResponse } from "@/features/images/api/postImage";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return apiErrorResponse("unauthorized", STATUS_UNAUTHORIZED);
    }

    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (
      imageFile &&
      typeof imageFile === "object" &&
      "arrayBuffer" in imageFile
    ) {
      const originalFileName = imageFile.name;
      const file = imageFile as unknown as Blob;

      // allowed mime types list
      const acceptedFileTypes = [
        "image/jpg",
        "image/png",
        "image/jpeg",
        "image/webp",
        " image/avif",
        "image/tiff",
      ];
      if (acceptedFileTypes.indexOf(file.type) === -1) {
        return apiErrorResponse(
          "unsupported file type/format",
          STATUS_UNSUPPORTED_MEDIA_TYPE,
        );
      }
      // if the file size exceeds 8 mb
      if (file.size > MAX_UPLOAD_FILE_SIZE) {
        return apiErrorResponse(
          "file too large (8mb max)",
          STATUS_CONTENT_TOO_LARGE,
        );
      }
      // await sleep(2400);
      const processedImage = await sharp(await file.arrayBuffer())
        .resize({
          fit: sharp.fit.contain,
          width: 1024,
        })
        .webp({ quality: 60 })
        .toBuffer();

      const imageUrl =
        "data:image/webp;base64," + processedImage.toString("base64");

      const imageUploadRes = await cloudinary.uploader.upload(imageUrl, {
        resource_type: "image",
        allowed_formats: ["webp"],
        folder: "orderer",
      });

      const imgId = imageUploadRes.public_id;

      await prisma.image.create({
        data: {
          id: imgId,
        },
      });

      return NextResponse.json<PostImageSuccessResponse>(
        {
          id: imgId,
          originalName: originalFileName,
          originalSize: file.size,
        },
        {
          status: 201,
          headers: {
            "Content-Type": "application/json ",
          },
        },
      );
    }
  } catch (e) {
    console.error("Error handing images api POST request", e);
    return apiErrorResponse();
  }
}

export async function GET(_: NextApiRequest) {
  // https://lh3.googleusercontent.com/d/FILE_ID
  const response = await getAllFiles();

  return NextResponse.json(response.data.files);
}

export async function DELETE() {
  try {
    const results = await prisma.image.findMany({
      where: {
        productId: { equals: null },
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    return apiErrorResponse("error deleting unused files");
  }
}
