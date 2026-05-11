import { toBoolean } from "@katebtech/core";
import z from "zod";
import { POST_FIELDS as pf } from "./constant";
const checkboxBoolean = z
    .preprocess((val) => toBoolean(val), z.boolean())
    .optional()
    .default(false);
export const postSchema = z.object({
    [pf.title]: z
        .string()
        .trim()
        .min(3, "Title is required and must be at least 3 characters")
        .max(120, "Title must be under 120 characters"),
    [pf.categoryId]: z.coerce.number().min(1, "category should selected"),
    [pf.isFeatured]: checkboxBoolean,
    [pf.statusCode]: z.coerce.number().min(1, "statusCode should be selected"),
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
export const POST_BOOLEAN_FIELDS = [
    pf.isFeatured,
];
