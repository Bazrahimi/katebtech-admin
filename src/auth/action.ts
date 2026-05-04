// // app/members/join/lib/action.ts
// "use server";
// import { adminRoutes, authRoutes } from "@katebtech/admin";
// import { createSession, safeAdminNext,  } from "@katebtech/admin/session";

// import { COOKIE_CONFIG as cc } from "@katebtech/admin/session";
// import { toActionErrors } from "@katebtech/layout/pages";
// import bcrypt from "bcrypt";
// import { redirect } from "next/navigation";
// import { verifyEmailCode } from "./verification";

// import {
//   clearResetUid,
//   clearVerifyCookies,
//   readResetUid,
//   readVerifyCookies,
//   setResetUid,
//   setVerifyCookies,
// } from "./cookies";
// import { findUserIdByEmail, getUserForLogin, updateUserPassword } from "./data";
// import { startVerificationFlow } from "./flow";
// import { issueVerificationCode } from "./verification";

// import type {
//   AuthState,
//   ForgotPasswordState,
//   ResetPasswordState,
//   VerifyCodeState,
// } from "@katebtech/admin/session";
// import {
//   authSchema,
//   forgotPasswordSchema,
//   resetPasswordSchema,
//   verifyCodeSchema,
// } from "@katebtech/admin/session";

// export const auth = async (
//   _prevState: AuthState | undefined,
//   formData: FormData,
// ): Promise<AuthState | undefined> => {
//   const rawEmail = String(formData.get("email") ?? "");
//   const rawPassword = String(formData.get("password") ?? "");
//   const next = String(formData.get("next")) ?? "";

//   const parsed = authSchema.safeParse({
//     email: rawEmail,
//     password: rawPassword,
//   });

//   if (!parsed.success) {
//     return {
//       ...toActionErrors<AuthState["errors"]>(parsed.error),
//       data: { email: rawEmail },
//     };
//   }

//   const { email, password } = parsed.data;

//   try {
//     const user = await getUserForLogin(email);

//     if (!user) {
//       return {
//         ok: false,
//         message: "No account found with the provided email address.",
//         data: { email },
//       };
//     }

//     const matched = await bcrypt.compare(password, user.passwordHash);
//     if (!matched) {
//       return {
//         ok: false,
//         message: "Incorrect password. Please try again.",
//         data: { email },
//       };
//     }

//     // ✅ Only create session if verified
//     await createSession(user.id);
//   } catch (error) {
//     console.error("Failed to login", error);
//     return {
//       ok: false,
//       message:
//         "An error occurred while processing your request. Please try again.",
//       data: { email },
//     };
//   }

//   redirect(safeAdminNext(next));
// };

// /**
//  * Forgot password – step 1:
//  * - Validate email
//  * - If user exists, set verify cookies + send code
//  * - Always return same message (do not reveal if email exists)
//  * - Tell client to redirect to /u/verify
//  */
// export const forgotPassword = async (
//   _prevState: ForgotPasswordState | undefined,
//   formData: FormData,
// ): Promise<ForgotPasswordState | undefined> => {
//   const rawEmail = String(formData.get("email") ?? "");

//   const parsed = forgotPasswordSchema.safeParse({ email: rawEmail });

//   if (!parsed.success) {
//     return {
//       ...toActionErrors<ForgotPasswordState["errors"]>(parsed.error),
//       data: { email: rawEmail },
//     };
//   }

//   const { email } = parsed.data;

//   let shouldRedirect = false;

//   try {
//     const userId = await findUserIdByEmail(email);

//     if (userId) {
//       await startVerificationFlow({
//         userId: Number(userId),
//         email,
//         mode: "reset",
//       });

//       shouldRedirect = true;
//     }
//   } catch (err) {
//     console.error("forgotPassword error:", err);

//     return {
//       ok: false,
//       message: "Something went wrong. Please try again later.",
//       data: { email },
//     };
//   }

//   if (shouldRedirect) {
//     redirect(authRoutes.verifyEmail());
//   }

//   return {
//     ok: true,
//     message:
//       "If an account exists for this email, we sent a verification code.",
//     data: { email },
//   };
// };

// export const resetPassword = async (
//   _prevState: ResetPasswordState | undefined,
//   formData: FormData,
// ): Promise<ResetPasswordState> => {
//   const rawPassword = String(formData.get("password") ?? "");
//   const rawConfirm = String(formData.get("confirmPassword") ?? "");

//   const parsed = resetPasswordSchema.safeParse({
//     password: rawPassword,
//     confirmPassword: rawConfirm,
//   });

//   if (!parsed.success) {
//     return {
//       ...toActionErrors<ResetPasswordState["errors"]>(parsed.error),
//       data: {},
//     };
//   }

//   const { password } = parsed.data;

//   // Read reset_uid from cookies
//   const userId = await readResetUid();

//   if (!userId) {
//     return {
//       ok: false,
//       message:
//         "Your reset session has expired. Please start the password reset process again.",
//     };
//   }

//   try {
//     const passwordHash = await bcrypt.hash(password, 12);

//     const ok = await updateUserPassword(userId, passwordHash);
//     if (!ok) return { ok: false, message: "Account not found." };
//     // Clear reset_uid cookie
//     await clearResetUid();
//   } catch (err) {
//     console.error("resetPassword error:", err);
//     return {
//       ok: false,
//       message: "Failed to update your password. Please try again.",
//     };
//   }
//   redirect(authRoutes.login());
// };

// export const resendCode = async (): Promise<{
//   ok: boolean;
//   message: string;
//   expiresAtMs?: number;
// }> => {
//   const ctx = await readVerifyCookies();

//   if (!ctx) {
//     return {
//       ok: false,
//       message:
//         "Verification session expired. Please try again or request a new code.",
//     };
//   }

//   // refresh cookie expiry window (new verify_exp + maxAge refresh)
//   await setVerifyCookies({
//     userId: ctx.userId,
//     email: ctx.email,
//     mode: ctx.mode,
//     maxAgeSeconds: cc.verificationTtlSeconds,
//   });

//   // ctx has: userId, email, mode, expiresAtMs
//   return issueVerificationCode({ userId: ctx.userId, email: ctx.email });
// };

// export const verifyCode = async (
//   _prev: VerifyCodeState | undefined,
//   formData: FormData,
// ): Promise<VerifyCodeState | never> => {
//   const parsed = verifyCodeSchema.safeParse({
//     code: String(formData.get("code") ?? "").trim(),
//   });

//   if (!parsed.success) {
//     return toActionErrors<VerifyCodeState["errors"]>(
//       parsed.error,
//       "Please enter the verification code.",
//     );
//   }

//   const { code } = parsed.data;

//   const ctx = await readVerifyCookies();
//   if (!ctx) {
//     return {
//       ok: false,
//       message: "Verification session expired. Please try again.",
//     };
//   }

//   const res = await verifyEmailCode({ userId: ctx.userId, code });
//   if (!res.ok) {
//     return { ok: false, message: res.message };
//   }

//   // ✅ success: clear verify cookies
//   await clearVerifyCookies();

//   // ✅ reset flow
//   if (ctx.mode === "reset") {
//     await setResetUid(ctx.userId);
//     redirect(authRoutes.resetPassword());
//   }

//   // ✅ login/signup flow
//   // (if your createSession needs roles/fullName, fetch them here or keep minimal)
//   await createSession(ctx.userId);

//   const next = safeAdminNext(formData.get("next"));
//   redirect(next || adminRoutes.root());
// };
