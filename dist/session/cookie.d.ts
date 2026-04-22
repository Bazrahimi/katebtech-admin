import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
export type BaseSessionCookie = Pick<ResponseCookie, "httpOnly" | "secure" | "sameSite" | "path">;
export declare const createBaseSessionCookie: (secure: boolean, sameSite?: "lax" | "strict" | "none", path?: string) => BaseSessionCookie;
//# sourceMappingURL=cookie.d.ts.map