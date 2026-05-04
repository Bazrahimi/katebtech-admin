//app/_lib/session/schema.ts
import z from "zod";
import type { ActionState } from "@katebtech/layout/pages";
export const sessionSchema = z.object({
  userId: z.coerce.number(),
  expiresAt: z
    .union([z.iso.datetime(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),
  extra: z.record(z.string(), z.unknown()).optional().default({}),
});

const EmailField = z
  .email({
    message:
      "That doesn’t look like a valid email. Please check the format (e.g., name@example.com).",
  })
  .transform((v) => v.trim().toLowerCase());

const PasswordField = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." });
// ↑ recommend aligning login/signup/reset to same policy if you want consistency

export const authSchema = z.object({
  email: EmailField,
  password: PasswordField,
});

export const forgotPasswordSchema = z.object({
  email: EmailField,
});

export const verifyCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});
export const ResetPasswordSchema = z
  .object({
    password: PasswordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
  
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Your current password is required." }),

    newPassword: PasswordField, // reuses your global policy

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New passwords do not match.",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "Your new password must be different from your current password.",
  });


type Auth = z.infer<typeof authSchema>;
export type AuthState = ActionState<Auth>;

type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordState = ActionState<ForgotPassword>;

type VerifyCode = z.infer<typeof verifyCodeSchema>;
export type VerifyCodeState = ActionState<VerifyCode>;

type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordState = ActionState<ResetPassword>;