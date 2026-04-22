import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type BaseSessionCookie = Pick<
  ResponseCookie,
  "httpOnly" | "secure" | "sameSite" | "path"
>;

export const createBaseSessionCookie = (
  secure = true,
  sameSite: "lax" | "strict" | "none" = "lax",
  path = "/",
): BaseSessionCookie => ({
  httpOnly: true,
  secure,
  sameSite,
  path,
});