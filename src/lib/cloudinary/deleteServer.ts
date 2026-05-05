// cloudinary/deleteServer.ts
import "server-only";

import { v2 as cloudinary } from "cloudinary";
import { publicIdFromPath } from "./publicId";
import type { CldResourceType, DeleteCldAssetResult } from "./types";

type CreateDeleteCldAssetServerOptions = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  safeFolder: string;
};

export const createDeleteCldAssetServer = ({
  cloudName,
  apiKey,
  apiSecret,
  safeFolder,
}: CreateDeleteCldAssetServerOptions) => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return async function deleteCldAssetServer(
    path: string,
    resourceType: CldResourceType = "image",
  ): Promise<DeleteCldAssetResult> {
    if (!path) {
      return { ok: false, message: "No asset path provided." };
    }

    const publicId = publicIdFromPath(path);

    if (!publicId) {
      return { ok: false, message: "Invalid asset path." };
    }

    const safePrefix = `${safeFolder}/`;

    if (!publicId.startsWith(safePrefix)) {
      return { ok: false, message: "Invalid asset path." };
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate: true,
      });

      if (result.result !== "ok" && result.result !== "not found") {
        return { ok: false, message: `Cloudinary: ${result.result}` };
      }

      return { ok: true };
    } catch (err) {
      console.error("Cloudinary delete failed", err);

      return {
        ok: false,
        message: "Cloudinary deletion failed.",
      };
    }
  };
};