//app/posts/lib/definitions.ts

import type { CamelizeKeys } from "@katebtech/core";

export const POST_STATUS = {
  DRAFT: 1,
  PUBLISHED: 2,
  ARCHIVED: 3,
} as const;

export type StatusCode = (typeof POST_STATUS)[keyof typeof POST_STATUS];

export const STATUS_CODES = [
  POST_STATUS.DRAFT,
  POST_STATUS.PUBLISHED,
  POST_STATUS.ARCHIVED,
] as const satisfies readonly StatusCode[];

const STATUS_CODE_SET = new Set<number>(STATUS_CODES);

export const isStatusCode = (v: unknown): v is StatusCode =>
  typeof v === "number" && STATUS_CODE_SET.has(v);

export const POST_STATUS_LABEL: Record<StatusCode, string> = {
  [POST_STATUS.DRAFT]: "Draft",
  [POST_STATUS.PUBLISHED]: "Published",
  [POST_STATUS.ARCHIVED]: "Archived",
};

type PostDbRow = {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content_html: string;
  excerpt: string;
  status_code: StatusCode;
  hero_img_path: string | null;
  is_featured: boolean;
  created_at: string; // timestamptz
  updated_at: string;
  category_id: number; // smallint but number in TS
};

// 3) Base camelCase post type, directly derived from DB
export type PostBase = CamelizeKeys<PostDbRow>;
export type PostDetailRow = PostBase;

export type PostCardRow = Pick<
  PostBase,
  "id" | "title" | "slug" | "heroImgPath" | "isFeatured" | "categoryId"
> & { excerpt?: PostBase["excerpt"] };

export type EditSinglePost = Pick<
  PostBase,
  | "id"
  | "title"
  | "contentHtml"
  | "excerpt"
  | "categoryId"
  | "statusCode"
  | "heroImgPath"
  | "isFeatured"
  | "createdAt"
>;

export type PostListRow = Pick<
  PostBase,
  | "id"
  | "title"
  | "slug"
  | "isFeatured"
  | "statusCode"
  | "createdAt"
  | "categoryId"
>;



export type ActionMode = "create" | "edit";

export type SlugInfo = {
  postId: number;
  categoryId: number;
  title: string;
};

export type PostSeoRow = Pick<
  PostBase,
  "id" | "title" | "slug" | "heroImgPath" | "excerpt" | "categoryId"
>;

export type PostSiteMapRow = Pick<
  PostBase,
  "slug" | "categoryId" | "createdAt" | "updatedAt"
>;
