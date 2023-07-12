import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { isAdmin, sleep, uniqueId } from "@/lib/utils";

import sharp from "sharp";
import { getAllFiles, uploadFile } from "@/lib/drive";
import { prisma } from "../../../../prisma/db";
import { cache } from "@/lib/cache";
import { PostImageSuccessResponsePayload } from "@/types/api";
import { MAX_UPLOAD_FILE_SIZE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session && isAdmin(session)) {
      const formData = await req.formData();
      const imageFile = formData.get("image");

      if (
        imageFile &&
        typeof imageFile === "object" &&
        "arrayBuffer" in imageFile
      ) {
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
          return NextResponse.json("unsupported file type/format", {
            status: 415,
          });
        }
        // if the file size exceeds 8 mb
        if (file.size > MAX_UPLOAD_FILE_SIZE) {
          return NextResponse.json("file too large (8mb max)", {
            status: 413,
          });
        }

        // await sleep(2400);
        // const fileName = `${uniqueId(24)}.jpg`;
        // cache the image id that was generated
        // const uploadedImages = cache.get("uploadedImageIds") as
        //   | string[]
        //   | undefined;

        // if (uploadedImages) {
        //   cache.set(
        //     "uploadedImageIds",
        //     [...(uploadedImages && uploadedImages), fileName],
        //     { ttl: 3600 * 1000 }
        //   );
        // } else {
        //   cache.set("uploadedImageIds", [fileName], { ttl: 3600 * 1000 });
        // }
        // console.log(uploadedImages);

        // return NextResponse.json<PostImageSuccessResponsePayload>(
        //   {
        //     id: uniqueId(24),
        //     originalName: file.name,
        //     originalSize: file.size,
        //   },
        //   {
        //     status: 201,
        //     headers: {
        //       "Content-Type": "application/json ",
        //     },
        //   }
        // );

        const processedImage = await sharp(await file.arrayBuffer())
          .resize({
            fit: sharp.fit.contain,
            width: 600,
          })
          .jpeg({ quality: 80 })
          .toBuffer();

        const fileName = `${uniqueId(24)}.jpg`;

        const imageId = await uploadFile(processedImage, fileName);

        console.log("FILE INFO => ", imageId);

        // save the image in the db

        await prisma.image.create({
          data: {
            id: imageId,
          },
        });

        return NextResponse.json(
          {
            id: imageId,
            originalName: file.name,
            originalSize: file.size,
          },
          {
            status: 201,
          }
        );
        // return NextResponse.json("ok");
      }
    } else {
      return NextResponse.json("unauthorized", { status: 401 });
    }
    // return NextResponse.json("OK");
  } catch (e) {
    console.error("Error handing images api POST request", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function GET(req: NextApiRequest) {
  // https://lh3.googleusercontent.com/d/FILE_ID
  const response = await getAllFiles();

  return NextResponse.json(response.data.files);
}
