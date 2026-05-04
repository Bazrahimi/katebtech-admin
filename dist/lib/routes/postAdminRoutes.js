export const postAdminRoutes = {
    index: (params) => {
        if (!params?.tab)
            return "/admin/posts";
        return `/admin/posts?tab=${params.tab}`;
    },
    new: () => "/admin/posts/new",
    edit: (postId) => `/admin/posts/edit/${postId}`,
};
