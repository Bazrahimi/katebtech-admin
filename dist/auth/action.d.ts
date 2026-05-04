import type { AuthState, ForgotPasswordState, ResetPasswordState, VerifyCodeState } from "@katebtech/admin/session";
export declare const auth: (_prevState: AuthState | undefined, formData: FormData) => Promise<AuthState | undefined>;
/**
 * Forgot password – step 1:
 * - Validate email
 * - If user exists, set verify cookies + send code
 * - Always return same message (do not reveal if email exists)
 * - Tell client to redirect to /u/verify
 */
export declare const forgotPassword: (_prevState: ForgotPasswordState | undefined, formData: FormData) => Promise<ForgotPasswordState | undefined>;
export declare const resetPassword: (_prevState: ResetPasswordState | undefined, formData: FormData) => Promise<ResetPasswordState>;
export declare const resendCode: () => Promise<{
    ok: boolean;
    message: string;
    expiresAtMs?: number;
}>;
export declare const verifyCode: (_prev: VerifyCodeState | undefined, formData: FormData) => Promise<VerifyCodeState | never>;
//# sourceMappingURL=action.d.ts.map