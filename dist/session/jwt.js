import { jwtVerify, SignJWT } from "jose";
import { AUTH_SESSION_CONFIG } from "./constants";
import { sessionSchema } from "./schema";
export const signSession = async (payload, sessionEncodedKey) => new SignJWT({
    userId: payload.userId,
    expiresAt: payload.expiresAt.toISOString(),
    extra: payload.extra ?? {},
})
    .setProtectedHeader({ alg: AUTH_SESSION_CONFIG.algorithm })
    .setIssuedAt()
    .setExpirationTime(AUTH_SESSION_CONFIG.duration)
    .sign(sessionEncodedKey);
export const verifySession = async (token, sessionEncodedKey) => {
    try {
        const { payload } = await jwtVerify(token, sessionEncodedKey, {
            algorithms: [AUTH_SESSION_CONFIG.algorithm],
        });
        const parsed = sessionSchema.parse({
            userId: payload.userId,
            expiresAt: payload.expiresAt,
            extra: payload.extra,
        });
        return {
            ...parsed,
            iat: payload.iat ?? 0,
            exp: payload.exp ?? 0,
        };
    }
    catch {
        return null;
    }
};
