import type { BaseSessionCookie } from "./cookie";
import type { DecodedSession, SessionInput } from "./definitions";
export declare const createSession: ({ userId, extra, sessionEncodedKey, baseSessionCookie, }: {
    userId: number;
    extra?: Record<string, unknown>;
    sessionEncodedKey: Uint8Array;
    baseSessionCookie: BaseSessionCookie;
}) => Promise<void>;
export declare const destroySession: ({ baseSessionCookie, }: {
    baseSessionCookie: BaseSessionCookie;
}) => Promise<void>;
export declare const encrypt: (payload: SessionInput, sessionEncodedKey: Uint8Array) => Promise<string>;
export declare const decrypt: (sessionEncodedKey: Uint8Array, session?: string | undefined) => Promise<DecodedSession | undefined>;
export declare const getSession: (sessionEncodedKey: Uint8Array) => Promise<DecodedSession | null>;
//# sourceMappingURL=service.d.ts.map