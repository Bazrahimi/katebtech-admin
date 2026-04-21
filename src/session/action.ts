import type { JWTPayload } from "jose";
import z from "zod";
import { sessionSchema } from "./schema";

export type SessionInput = z.input<typeof sessionSchema>;
export type SessionNormalized = z.output<typeof sessionSchema>;
export type Session = z.infer<typeof sessionSchema>;

export type DecodedSession = SessionNormalized &
  Required<Pick<JWTPayload, "iat" | "exp">>;
