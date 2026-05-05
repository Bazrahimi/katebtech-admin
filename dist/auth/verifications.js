"use strict";
// // app/u/lib/verification.tsx
// "use server";
// import { FROM_KATEBTECH, createEmailClient } from "@katebtech/emails";
// import bcrypt from "bcrypt"; // or: import bcrypt from "bcrypt";
// import {
//   getEmailVerificationRow,
//   incrementEmailVerificationAttempts,
//   upsertEmailVerification,
//   verifyUserEmailAndDeleteCode,
// } from "./data";
// import { generate6DigitCode } from "./helper";
// // import { FROM_EMAIL, resend } from "../ui/resend/email";
// import { COOKIE_CONFIG as cc } from "@katebtech/admin/session";
// import { EmailVerificationCode } from "@katebtech/emails";
// export const issueVerificationCode = async ({
//   userId,
//   email,
//   resendApiKey,
// }: {
//   userId: number;
//   email: string;
//   resendApiKey: string;
// }) => {
//   const code = generate6DigitCode();
//   const codeHash = await bcrypt.hash(code, 12);
//   const expiresAtMs = Date.now() + cc.verificationTtlSeconds * 1000;
//   const expiresAt = new Date(expiresAtMs);
//   // 1) DB: store codeHash + expiry
//   await upsertEmailVerification({
//     userId: userId,
//     codeHash,
//     expiresAt,
//   });
//   const emailClient = createEmailClient(resendApiKey);
//   await emailClient.emails.send({
//     from: FROM_KATEBTECH,
//     to: [email],
//     subject: "Your verification code",
//     react: <EmailVerificationCode code={code} />, // ✅ JSX ok in .tsx
//   });
//   return { ok: true as const, message: "Verification code sent." };
// };
// /** Verify a submitted 6-digit code. */
// export async function verifyEmailCode({
//   userId,
//   code,
// }: {
//   userId: number;
//   code: string;
// }) {
//   const rec = await getEmailVerificationRow(userId);
//   if (!rec) {
//     return { ok: false as const, message: "No verification code found." };
//   }
//   // Expired?
//   if (new Date(rec.expiresAt).getTime() < Date.now()) {
//     return {
//       ok: false as const,
//       message: "Code has expired. Request a new one.",
//     };
//   }
//   // Match?
//   const isMatch = await bcrypt.compare(code, rec.codeHash);
//   if (!isMatch) {
//     await incrementEmailVerificationAttempts(userId);
//     return { ok: false as const, message: "Invalid code. Please try again." };
//   }
//   // Success
//   await verifyUserEmailAndDeleteCode(userId);
//   return { ok: true as const, message: "Email verified." };
// }
