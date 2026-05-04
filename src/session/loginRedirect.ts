import { authRoutes } from "@katebtech/admin";

export const buildLoginHrefWithNext = (next: string): string => {
  return `${authRoutes.login()}?next=${encodeURIComponent(next)}`;
};