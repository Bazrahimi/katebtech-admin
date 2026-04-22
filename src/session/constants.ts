//app/_lib/session/constant.ts

export const COOKIE_CONFIG = {
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  verificationTtlSeconds: 10 * 60,
  verifyEmailCookiePath: "/u",
} as const;

export const AUTH_SESSION_CONFIG = {
  cookieName: "session" as const,
  algorithm: "HS256" as const,
  ttlMs: 12 * 60 * 60 * 1000,
  duration: "12h" as const,
} as const;
