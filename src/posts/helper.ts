import type { SlugInfo } from "./definitions";

export const extractPostFromSlug = (param: string): SlugInfo | null => {
  if (!param) return null;

  // match: "some-post-title-123"
  const match = param.match(/^(.*)-(\d+)$/);
  if (!match) return null;

  const [, rawTitle, postIdStr] = match;

  const postId = Number(postIdStr);

  if (!Number.isInteger(postId) || postId <= 0) {
    return null;
  }

  const title = decodeURIComponent(rawTitle).replace(/-/g, " ").trim();

  return {
    postId,
    title,
  };
};
