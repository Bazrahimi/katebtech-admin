import type { ParseResult, PostActionState } from "./definitions";
export declare const parsePostForm: (formData: FormData) => ParseResult;
export declare const postFailure: (message: string, extra?: Partial<Omit<PostActionState, "ok" | "message">>) => PostActionState;
export declare const postSuccess: (message: string, extra?: Partial<Omit<PostActionState, "ok" | "message">>) => PostActionState;
//# sourceMappingURL=actionHelper.d.ts.map