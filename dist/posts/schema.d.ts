import z from "zod";
import type { StatusCode } from "./definitions";
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    contentHtml: z.ZodString;
    excerpt: z.ZodString;
    heroImgPath: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    eventDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    eventLocation: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type PostInput = z.infer<typeof postSchema>;
export type PostCreateInput = PostInput & {
    categoryId: number;
    statusCode: StatusCode;
    isFeatured: boolean;
};
export type PostUpdateInput = PostInput & {
    categoryId: number;
    statusCode: StatusCode;
    isFeatured: boolean;
};
//# sourceMappingURL=schema.d.ts.map