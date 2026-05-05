// cloudinary/publicId.ts
export function publicIdFromPath(pathIn: string): string {
  try {
    let path = pathIn.trim();

    if (!path) return "";

    if (path.startsWith("/")) path = path.slice(1);

    path = path.split("?")[0];

    const parts = path.split("/");

    if (/^v\d+$/.test(parts[0] || "")) {
      parts.shift();
    }

    const last = parts.pop();

    if (!last) return "";

    parts.push(last.replace(/\.[^./]+$/, ""));

    return parts.join("/");
  } catch {
    return "";
  }
}
