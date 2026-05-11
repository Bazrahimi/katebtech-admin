import type { ActionState, BooleanKeys } from "@katebtech/core";
import z from "zod";
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    categoryId: z.ZodCoercedNumber<unknown>;
    isFeatured: z.ZodDefault<z.ZodOptional<z.ZodPreprocess<z.ZodBoolean>>>;
    statusCode: z.ZodCoercedNumber<unknown>;
    contentHtml: z.ZodString;
    excerpt: z.ZodString;
    heroImgPath: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type Post = z.infer<typeof postSchema>;
export type PostState = ActionState<Post>;
export type PostBooleanKey = BooleanKeys<Post>;
export declare const POST_BOOLEAN_FIELDS: readonly ["isFeatured"];
//# sourceMappingURL=schema.d.ts.map