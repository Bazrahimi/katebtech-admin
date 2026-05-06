
import { POST_STATUS } from "@katebtech/admin/posts";

export const POST_STATUS_LIST_CONFIG = {
  [POST_STATUS.DRAFT]: {
    title: "Drafts",

    description: "Posts that are not yet visible to the public.",

    empty: "You don't have any drafts yet.",

    edit: "Edit Draft",

    preview: "Preview",

    border: "border-slate-200",
    bg: "bg-white",
    articleBorder: "border-slate-100",
    articleBg: "bg-slate-50",
  },

  [POST_STATUS.PUBLISHED]: {
    title: "Published",

    description: "Posts currently live and visible on the website.",

    empty: "You haven't published any posts yet.",

    view: "View Live",

    edit: "Edit",

    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    articleBorder: "border-emerald-100",
    articleBg: "bg-white",
  },

  [POST_STATUS.ARCHIVED]: {
    title: "Archived",

    description:
      "Posts that are hidden from the public but kept for your records.",

    empty: "You don't have any archived posts.",

    restoreEdit: "Restore / Edit",

    border: "border-red-200",
    bg: "bg-red-50/60",
    articleBorder: "border-red-100",
    articleBg: "bg-white",
  },
} as const;
