import type { DecodedSession, SessionNormalized } from "./definitions";
export declare const signSession: (payload: SessionNormalized, sessionEncodedKey: Uint8Array) => Promise<string>;
export declare const verifySession: (token: string, sessionEncodedKey: Uint8Array) => Promise<DecodedSession | null>;
//# sourceMappingURL=jwt.d.ts.map