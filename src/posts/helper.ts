import type { SlugInfo } from "./definitions";
export const extractCategoryIdFromSlug = (slug: string): number | null => {
  if (!slug) return null;
  const match = slug.match(/-(\d+)$/);
  if (!match) return null;

  const categoryId = Number(match[1]);

  return Number.isInteger(categoryId) ? categoryId : null;
};

export const extractPostFromSlug = (param: string): SlugInfo | null => {
  if (!param) return null;

  // match: "some-post-title-123-5"
  const match = param.match(/^(.*)-(\d+)-(\d+)$/);
  if (!match) return null;

  const [, rawTitle, postIdStr, categoryIdStr] = match;

  const postId = Number(postIdStr);
  const categoryId = Number(categoryIdStr);

  if (
    !Number.isInteger(postId) ||
    postId <= 0 ||
    !Number.isInteger(categoryId) ||
    categoryId <= 0
  ) {
    return null;
  }

  const title = decodeURIComponent(rawTitle).replace(/-/g, " ").trim();

  return {
    postId,
    categoryId,
    title,
  };
};
