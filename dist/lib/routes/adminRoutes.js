export const adminRoutes = {
    root: () => "/admin",
    analytics: () => "/admin/analytics",
    blog: () => "/admin/posts",
    newBlogPost: () => "/admin/posts/new",
    editBlogPost: (id) => `/admin/posts/${encodeURIComponent(id)}/edit`,
    users: () => "/admin/users",
    settings: () => "/admin/settings"
};
