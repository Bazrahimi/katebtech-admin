export const postAdminRoutes = {
  index: (params?: { tab?: number | string }) => {
    if (!params?.tab) return "/admin/posts";
    return `/admin/posts?tab=${params.tab}`;
  },

  new: () => "/admin/posts/new",

  edit: (postId: number | string) => `/admin/posts/edit/${postId}`,
};
