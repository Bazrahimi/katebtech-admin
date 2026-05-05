import { cldApiRoutes } from "../lib/routes/cldApiRoutes";
import type { DeleteCldAssetInput, DeleteCldAssetResult } from "./types";

export async function deleteCldAssetClient({
  path,
  resourceType = "image",
}: DeleteCldAssetInput): Promise<DeleteCldAssetResult> {
  if (!path) {
    return { ok: false, message: "No asset path provided." };
  }

  try {
    const res = await fetch(cldApiRoutes.cloudinary.destroy(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ path, resourceType }),
    });

    const ct = res.headers.get("content-type") || "";
    const json = ct.includes("application/json")
      ? await res.json()
      : { ok: false, message: await res.text() };

    if (!res.ok || !json?.ok) {
      return {
        ok: false,
        message: json?.message || `Delete failed (${res.status})`,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("deleteCldAsset error:", err);
    return { ok: false, message: "Failed to delete asset." };
  }
}
