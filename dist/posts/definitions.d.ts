import type { CamelizeKeys } from "@katebtech/core";
export declare const POST_STATUS: {
    readonly DRAFT: 1;
    readonly PUBLISHED: 2;
    readonly ARCHIVED: 3;
};
export type StatusCode = (typeof POST_STATUS)[keyof typeof POST_STATUS];
export declare const STATUS_CODES: readonly [1, 2, 3];
export declare const isStatusCode: (v: unknown) => v is StatusCode;
export declare const POST_STATUS_LABEL: Record<StatusCode, string>;
type PostDbRow = {
    id: number;
    title: string;
    slug: string;
    content_html: string;
    excerpt: string;
    status_code: StatusCode;
    hero_img_path: string | null;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    category_id: number;
};
export type PostBase = CamelizeKeys<PostDbRow>;
export type PostDetailRow = PostBase;
export type PostCardRow = Pick<PostBase, "id" | "title" | "slug" | "heroImgPath" | "isFeatured" | "categoryId"> & {
    excerpt?: PostBase["excerpt"];
};
export type EditSinglePost = Pick<PostBase, "id" | "title" | "contentHtml" | "excerpt" | "categoryId" | "statusCode" | "heroImgPath" | "isFeatured" | "createdAt">;
export type PostListRow = Pick<PostBase, "id" | "title" | "slug" | "isFeatured" | "statusCode" | "createdAt" | "categoryId">;
export type ActionMode = "create" | "edit";
export type SlugInfo = {
    postId: number;
    title: string;
};
export type PostSeoRow = Pick<PostBase, "id" | "title" | "slug" | "heroImgPath" | "excerpt" | "categoryId">;
export type PostSiteMapRow = Pick<PostBase, "slug" | "categoryId" | "createdAt" | "updatedAt">;
export {};
//# sourceMappingURL=definitions.d.ts.map