import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { adminRoutes } from "@katebtech/admin";
import { buildLoginHrefWithNext } from "./loginRedirect";
import { matchesProtectedPrefix } from "./protectedRoutes";

export const safeAdminNext = (input: unknown): string => {
  if (!input) return adminRoutes.root();

  let decoded = String(input);

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return adminRoutes.root();
  }

  if (!decoded.startsWith("/")) return adminRoutes.root();

  return matchesProtectedPrefix(decoded) ? decoded : adminRoutes.root();
};

export const redirectToLoginWithNext = async (
  fallbackNext = "/",
): Promise<never> => {
  const h = headers();
  const pathname = (await h).get("x-pathname") ?? fallbackNext;
  redirect(buildLoginHrefWithNext(pathname));
};
