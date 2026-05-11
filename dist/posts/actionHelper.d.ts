import type { PostState } from "./schema";
export declare const postFailure: (message: string, extra?: Partial<Omit<PostState, "ok" | "message">>) => PostState;
export declare const postSuccess: (message: string, extra?: Partial<Omit<PostState, "ok" | "message">>) => PostState;
//# sourceMappingURL=actionHelper.d.ts.map