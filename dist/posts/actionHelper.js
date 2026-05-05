// src/posts/actionHelper.ts
import { postSchema } from "./schema";
export const parsePostForm = (formData) => {
    const raw = Object.fromEntries(formData.entries());
    const parsed = postSchema.safeParse(raw);
    if (parsed.success) {
        return { ok: true, data: parsed.data };
    }
    const fieldErrors = {};
    for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
            const key = field;
            if (!fieldErrors[key]) {
                fieldErrors[key] = [];
            }
            fieldErrors[key].push(issue.message);
        }
    }
    const normalizedData = {
        title: raw.title ?? "",
        contentHtml: raw.contentHtml ?? "",
        heroImgPath: raw.heroImgPath ?? "",
        eventDate: raw.eventDate ?? undefined,
        eventLocation: raw.eventLocation ?? undefined,
    };
    return {
        ok: false,
        errors: fieldErrors,
        normalizedData,
    };
};
export const postFailure = (message, extra = {}) => {
    return {
        ok: false,
        message,
        ...extra,
    };
};
export const postSuccess = (message, extra = {}) => {
    return {
        ok: true,
        message,
        ...extra,
    };
};
