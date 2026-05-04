import z from "zod";
import type { ActionState } from "@katebtech/layout/pages";
export declare const sessionSchema: z.ZodObject<{
    userId: z.ZodCoercedNumber<unknown>;
    expiresAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodISODateTime, z.ZodDate]>, z.ZodTransform<Date, string | Date>>;
    extra: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, z.core.$strip>;
export declare const authSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
}, z.core.$strip>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
}, z.core.$strip>;
export declare const verifyCodeSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
export declare const ResetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const ChangePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strip>;
type Auth = z.infer<typeof authSchema>;
export type AuthState = ActionState<Auth>;
type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordState = ActionState<ForgotPassword>;
type VerifyCode = z.infer<typeof verifyCodeSchema>;
export type VerifyCodeState = ActionState<VerifyCode>;
type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordState = ActionState<ResetPassword>;
export {};
//# sourceMappingURL=schema.d.ts.map