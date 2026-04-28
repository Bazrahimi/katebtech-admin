//app/_lib/session/constant.ts
export const COOKIE_CONFIG = {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    verificationTtlSeconds: 10 * 60,
    verifyEmailCookiePath: "/u",
};
export const AUTH_SESSION_CONFIG = {
    cookieName: "session",
    algorithm: "HS256",
    ttlMs: 12 * 60 * 60 * 1000,
    duration: "12h",
};
