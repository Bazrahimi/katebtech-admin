export const createBaseSessionCookie = (secure, sameSite = "lax", path = "/") => ({
    httpOnly: true,
    secure,
    sameSite,
    path,
});
