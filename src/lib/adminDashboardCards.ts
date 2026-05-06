import { adminRoutes } from "@katebtech/admin";

export const adminDashboardCards = [
  {
    title: "New Post",
    description: "Create and publish a new website post.",
    href: adminRoutes.newBlogPost(),
  },
  {
    title: "Posts",
    description: "View, edit, publish, or archive existing posts.",
    href: adminRoutes.blog(),
  },
  {
    title: "Settings",
    description: "Manage your admin account settings.",
    href: adminRoutes.settings(),
  },
] as const;
