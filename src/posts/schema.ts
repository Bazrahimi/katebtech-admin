import type { ActionState, BooleanKeys } from "@katebtech/core";
import { toBoolean } from "@katebtech/core";
import z from "zod";
import { POST_FIELDS as pf } from "./constant";
import { POST_STATUS } from "./definitions";

const checkboxBoolean = z
  .preprocess((val) => toBoolean(val), z.boolean())
  .optional()
  .default(false);

  const StatusCodeField = z.preprocess(
  (value) => {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return undefined;
    }

    return numberValue;
  },
  z
    .number({
      error: "Status should be selected",
    })
    .int("Status should be selected")
    .refine(
      (value) =>
        value === POST_STATUS.DRAFT ||
        value === POST_STATUS.PUBLISHED ||
        value === POST_STATUS.ARCHIVED,
      {
        message: "Status should be selected",
      },
    ),
);

export const postSchema = z.object({
  [pf.title]: z
    .string()
    .trim()
    .min(3, "Title is required and must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),
  [pf.categoryId]: z.coerce.number().min(1, "category should selected"),

  [pf.isFeatured]: checkboxBoolean,
  [pf.statusCode]: StatusCodeField,

  [pf.contentHtml]: z
    .string()
    .min(20, "Content is required and must be at least 20 characters."),

  [pf.excerpt]: z
    .string()
    .trim()
    .min(20, "Excerpt must be at least 20 characters.")
    .max(160, "Excerpt must not exceed 160 characters."),

  [pf.heroImgPath]: z.string().trim().optional().nullable(),
});

export type Post = z.infer<typeof postSchema>;
export type PostState = ActionState<Post>;
export type PostBooleanKey = BooleanKeys<Post>;

export const POST_BOOLEAN_FIELDS = [
  pf.isFeatured,
] as const satisfies readonly PostBooleanKey[];
