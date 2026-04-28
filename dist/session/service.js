"use server";
import { cookies } from "next/headers";
import { AUTH_SESSION_CONFIG } from "./constants";
import { signSession, verifySession } from "./jwt";
import { sessionSchema } from "./schema";
export const createSession = async ({ userId, extra = {}, sessionEncodedKey, baseSessionCookie, }) => {
    const expiresAt = new Date(Date.now() + AUTH_SESSION_CONFIG.ttlMs);
    const payload = sessionSchema.parse({
        userId,
        expiresAt,
        extra,
    });
    const token = await signSession(payload, sessionEncodedKey);
    const jar = await cookies();
    jar.set(AUTH_SESSION_CONFIG.cookieName, token, {
        ...baseSessionCookie,
        expires: payload.expiresAt,
    });
};
export const destroySession = async ({ baseSessionCookie, }) => {
    const jar = await cookies();
    jar.set(AUTH_SESSION_CONFIG.cookieName, "", {
        ...baseSessionCookie,
        expires: new Date(0),
    });
};
export const encrypt = async (payload, sessionEncodedKey) => {
    const normalized = sessionSchema.parse(payload);
    return signSession(normalized, sessionEncodedKey);
};
export const decrypt = async (sessionEncodedKey, session = "") => {
    if (!session)
        return undefined;
    const verified = await verifySession(session, sessionEncodedKey);
    return verified ?? undefined;
};
export const getSession = async (sessionEncodedKey) => {
    const token = (await cookies()).get(AUTH_SESSION_CONFIG.cookieName)?.value;
    if (!token)
        return null;
    const session = await verifySession(token, sessionEncodedKey);
    if (!session)
        return null;
    if (session.expiresAt.getTime() <= Date.now())
        return null;
    return session;
};
