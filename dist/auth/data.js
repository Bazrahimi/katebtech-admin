"use strict";
// import { sql } from "@/app/_lib/db";
// import type { EmailVerificationRow } from "./definitions";
// import { UserForLogin } from "./definitions";
// export const getUserForLogin = async (
//   email: string,
// ): Promise<UserForLogin | null> => {
//   const rows = await sql<UserForLogin[]>`
//     SELECT
//       u.id            AS "id",
//       u.password_hash AS "passwordHash"
//     FROM users AS u
//     WHERE lower(u.email) = lower(${email})
//   `;
//   return rows[0] ?? null;
// };
// export const findUserIdByEmail = async (
//   email: string,
// ): Promise<number | null> => {
//   const rows = await sql<{ id: number }[]>`
//     SELECT
//       id
//     FROM
//       users
//     WHERE
//       lower(email) = lower(${email})
//     LIMIT 1
//   `;
//   return rows.length > 0 ? rows[0].id : null;
// };
// export const getEmailVerificationRow = async (
//   userId: number,
// ): Promise<EmailVerificationRow | null> => {
//   const rows = await sql<EmailVerificationRow[]>`
//     SELECT
//       code_hash AS "codeHash",
//       expires_at AS "expiresAt",
//       attempts  AS "attempts"
//     FROM public.email_verifications
//     WHERE user_id = ${userId}
//     LIMIT 1;
//   `;
//   return rows[0] ?? null;
// };
// export const incrementEmailVerificationAttempts = async (
//   userId: number,
// ): Promise<void> => {
//   await sql`
//     UPDATE public.email_verifications
//     SET attempts = attempts + 1, updated_at = now()
//     WHERE user_id = ${userId};
//   `;
// };
// export const verifyUserEmailAndDeleteCode = async (
//   userId: number,
// ): Promise<void> => {
//   await sql.begin(async (trx) => {
//     await trx`
//       UPDATE public.users
//       SET email_verified_at = now()
//       WHERE id = ${userId};
//     `;
//     await trx`
//       DELETE FROM public.email_verifications
//       WHERE user_id = ${userId};
//     `;
//   });
// };
// export const upsertEmailVerification = async ({
//   userId,
//   codeHash,
//   expiresAt,
// }: {
//   userId: number;
//   codeHash: string;
//   expiresAt: Date;
// }): Promise<void> => {
//   await sql`
//     INSERT INTO public.email_verifications 
//       (user_id, code_hash, expires_at, attempts, last_sent_at)
//     VALUES 
//       (${userId}, ${codeHash}, ${expiresAt.toISOString()}, 0, now())
//     ON CONFLICT (user_id) DO UPDATE
//       SET code_hash = EXCLUDED.code_hash,
//           expires_at = EXCLUDED.expires_at,
//           attempts = 0,
//           last_sent_at = now(),
//           updated_at = now()
//   `;
// };
// export const updateUserPassword = async (
//   userId: number,
//   passwordHash: string,
// ): Promise<boolean> => {
//   const rows = await sql<{ id: number }[]>`
//     UPDATE public.users
//     SET 
//       password_hash = ${passwordHash},
//       updated_at = now()
//     WHERE id = ${userId}
//     RETURNING id;
//   `;
//   return rows.length === 1;
// };
