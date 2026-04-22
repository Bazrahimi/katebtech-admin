export const createBaseSessionCookie = (secure = true, sameSite = "lax", path = "/") => ({
    httpOnly: true,
    secure,
    sameSite,
    path,
});
