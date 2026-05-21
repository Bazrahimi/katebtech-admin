import "server-only";
import type { Post } from "./schema";
import type { EditSinglePost, PostCardRow, PostDetailRow, PostListRow, PostSeoRow, PostSiteMapRow, StatusCode } from "./definitions";
export type CreatePostDataOptions = {
    postgresUrl: string;
    sessionEncodedKey: Uint8Array;
};
export declare const createPostData: ({ postgresUrl, sessionEncodedKey, }: CreatePostDataOptions) => {
    insertPost: (opts: {
        userId: number;
        data: Post;
        slug: string;
        createdAt: Date;
    }) => Promise<{
        id: number;
    }>;
    updatePostRow: (opts: {
        id: number;
        data: Post;
    }) => Promise<{
        id: number;
    } | null>;
    getPostBySlugId: (postId: number) => Promise<PostDetailRow | null>;
    getFeaturedPostsByCategory: (categoryId: number, limit: number) => Promise<PostCardRow[]>;
    getPublishedPostsByCategory: (categoryId: number, limit: number) => Promise<PostCardRow[]>;
    getRelatedPostsByTitle: ({ postId, categoryId, title, limit, }: {
        postId: number;
        categoryId: number;
        title: string;
        limit?: number;
    }) => Promise<PostCardRow[]>;
    getEditPostById: ({ postId, }: {
        postId: number;
    }) => Promise<EditSinglePost>;
    getPostCounts: () => Promise<Record<StatusCode, number>>;
    getPostsByStatus: (statusCode: StatusCode) => Promise<PostListRow[]>;
    getPublishedPostsForSitemap: () => Promise<PostSiteMapRow[]>;
    getPostSeoById: (postId: number) => Promise<PostSeoRow>;
};
//# sourceMappingURL=data.d.ts.map