// src/posts/actionHelper.ts
import type { postSchema, PostState } from "./schema";



// export const parsePostForm = (formData: FormData): ParseResult => {
//   const raw = Object.fromEntries(formData.entries());
//   const parsed = postSchema.safeParse(raw);

//   if (parsed.success) {
//     return { ok: true, data: parsed.data };
//   }

//   const fieldErrors: PostState["errors"] = {};

//   for (const issue of parsed.error.issues) {
//     const field = issue.path[0];

//     if (typeof field === "string") {
//       const key = field as keyof PostInput;

//       if (!fieldErrors[key]) {
//         fieldErrors[key] = [];
//       }

//       fieldErrors[key]!.push(issue.message);
//     }
//   }

//   const normalizedData: Partial<PostInput> = {
//     title: (raw.title as string) ?? "",
//     contentHtml: (raw.contentHtml as string) ?? "",
//     heroImgPath: (raw.heroImgPath as string) ?? "",
//     eventDate: (raw.eventDate as string) ?? undefined,
//     eventLocation: (raw.eventLocation as string) ?? undefined,
//   };

//   return {
//     ok: false,
//     errors: fieldErrors,
//     normalizedData,
//   };
// };

export const postFailure = (
  message: string,
  extra: Partial<Omit<PostState, "ok" | "message">> = {},
): PostState => {
  return {
    ok: false,
    message,
    ...extra,
  };
};

export const postSuccess = (
  message: string,
  extra: Partial<Omit<PostState, "ok" | "message">> = {},
): PostState => {
  return {
    ok: true,
    message,
    ...extra,
  };
};
