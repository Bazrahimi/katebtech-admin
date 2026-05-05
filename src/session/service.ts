"use server";

import { cookies } from "next/headers";
import { AUTH_SESSION_CONFIG } from "./constants";
import { createBaseSessionCookie, type BaseSessionCookie } from "./cookie";
import type { DecodedSession, SessionInput } from "./definitions";
import { signSession, verifySession } from "./jwt";
import { sessionSchema } from "./schema";

export const createSession = async ({
  userId,
  extra = {},
  sessionEncodedKey,
  baseSessionCookie = createBaseSessionCookie(),
}: {
  userId: number;
  extra?: Record<string, unknown>;
  sessionEncodedKey: Uint8Array;
  baseSessionCookie?: BaseSessionCookie;
}): Promise<void> => {
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

export const destroySession = async ({
  baseSessionCookie = createBaseSessionCookie(),
}: {
  baseSessionCookie?: BaseSessionCookie;
} = {}): Promise<void> => {
  const jar = await cookies();

  jar.set(AUTH_SESSION_CONFIG.cookieName, "", {
    ...baseSessionCookie,
    expires: new Date(0),
    maxAge: 0,
  });
};

export const encrypt = async (
  payload: SessionInput,
  sessionEncodedKey: Uint8Array,
): Promise<string> => {
  const normalized = sessionSchema.parse(payload);

  return signSession(normalized, sessionEncodedKey);
};

export const decrypt = async (
  sessionEncodedKey: Uint8Array,
  session: string | undefined = "",
): Promise<DecodedSession | undefined> => {
  if (!session) return undefined;

  const verified = await verifySession(session, sessionEncodedKey);

  return verified ?? undefined;
};

export const getSession = async (
  sessionEncodedKey: Uint8Array,
): Promise<DecodedSession | null> => {
  const token = (await cookies()).get(AUTH_SESSION_CONFIG.cookieName)?.value;

  if (!token) return null;

  const session = await verifySession(token, sessionEncodedKey);

  if (!session) return null;

  if (session.expiresAt.getTime() <= Date.now()) return null;

  return session;
};
