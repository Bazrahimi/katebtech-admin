//app/_lib/session/schema.ts
import z from "zod";

export const sessionSchema = z.object({
  userId: z.coerce.number(),
  expiresAt: z
    .union([z.iso.datetime(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),
  extra: z.record(z.string(), z.unknown()).optional().default({}),
});
