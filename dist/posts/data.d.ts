import "server-only";
import type { EditSinglePost, PostCardRow, PostDetailRow, PostListRow, PostSuccessDBReturn, StatusCode } from "./definitions";
import type { PostCreateInput, PostUpdateInput } from "./schema";
export type CreatePostDataOptions = {
    postgresUrl: string;
    sessionEncodedKey: Uint8Array;
};
export declare const createPostData: ({ postgresUrl, sessionEncodedKey, }: CreatePostDataOptions) => {
    sql: import("postgres").Sql<{}>;
    insertPost: (opts: {
        userId: number;
        data: PostCreateInput;
        slug: string;
        createdAt: Date;
    }) => Promise<PostSuccessDBReturn>;
    updatePostRow: (opts: {
        id: number;
        data: PostUpdateInput;
    }) => Promise<PostSuccessDBReturn | null>;
    getPostBySlugId: (postId: number) => Promise<PostDetailRow>;
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
};
//# sourceMappingURL=data.d.ts.map