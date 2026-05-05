import z from "zod";
export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title is required and must be at least 3 characters")
        .max(120, "Title must be under 120 characters"),
    contentHtml: z
        .string()
        .min(20, "Content is required and must be at least 20 characters."),
    excerpt: z
        .string()
        .trim()
        .min(20, "Excerpt must be at least 20 characters.")
        .max(160, "Excerpt must not exceed 160 characters."),
    heroImgPath: z.string().trim().optional().nullable(),
    // datetime-local will submit a string like "2025-11-18T11:30"
    eventDate: z.string().optional().nullable(),
    eventLocation: z.string().trim().optional().nullable(),
});
