import { drive_v3, google } from "googleapis";
import path from "path";

import { Readable } from "stream";

const getDriveAuth = (): drive_v3.Drive => {
  const googleAuth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "key.json"),
    scopes: [
      "https://www.googleapis.com/auth/drive.appdata",
      "https://www.googleapis.com/auth/drive.appfolder",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.resource",
    ],
  });

  return google.drive({
    version: "v3",
    auth: googleAuth,
  });
};

const getUploadFolder = async (file: Blob, fileName: string) => {
  const drive = getDriveAuth();

  const getFolder = await drive.files.get();

  const folder = await drive.files.create({
    requestBody: {
      mimeType: "application/vnd.google-apps.folder",
      name: "orderer",
    },
  });
};

/**
 * Uploads the file to Google Drive and makes it publicly viewable.
 * @param file The file to upload
 * @param fileName The name that the uploaded file will have
 * @param mimeType The mime type of the uploaded file - default image/jpeg
 * @returns The file id
 */
export const uploadFile = async (
  file: Buffer,
  fileName: string,
  mimeType = "image/jpeg"
) => {
  try {
    const drive = getDriveAuth();

    const readableFileStream = Readable.from(file);

    const fileResponse = await drive.files.create({
      requestBody: {
        mimeType: mimeType,
        name: fileName,
        // permissions: [{ role: "reader", type: "anyone" }],
      },
      media: {
        body: readableFileStream,
        mimeType: mimeType,
      },
      fields: "id",
    });

    readableFileStream.destroy();

    await drive.permissions.create({
      fileId: fileResponse.data.id as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      fields: "id",
    });

    return fileResponse.data.id as string;
  } catch (err) {
    throw err;
  }
};

const getImageFile = async (fileId: string) => {
  const drive = getDriveAuth();
  try {
    const response = await drive.files.get({
      fileId,
      fields: "webContentLink",
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllFiles = async () => {
  const drive = getDriveAuth();
  try {
    const response = await drive.files.list();
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteFile = async (fileId: string) => {
  const drive = getDriveAuth();

  try {
    const response = await drive.files.delete({
      fileId,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteAllFiles = async () => {
  try {
    const response = await getAllFiles();
    const files = response.data.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = file.id;
      console.log("deleting file with id", id);
      if (id) await deleteFile(id);
    }

    return true;
  } catch (err) {
    throw err;
  }
};
