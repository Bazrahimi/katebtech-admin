import "server-only";
import { type PostState } from "./schema";
type DeleteAssetResult = {
    ok: boolean;
    message?: string;
};
type CreatePostActionsOptions = {
    postgresUrl: string;
    sessionEncodedKey: Uint8Array;
    deleteAsset?: (path: string) => Promise<DeleteAssetResult>;
};
export declare const createPostActions: ({ postgresUrl, sessionEncodedKey, deleteAsset, }: CreatePostActionsOptions) => {
    createPost: (_prevState: PostState | undefined, formData: FormData) => Promise<PostState>;
    updatePost: (_prevState: PostState | undefined, formData: FormData) => Promise<PostState>;
    featurePostAction: (_prev: PostState | undefined, formData: FormData) => Promise<PostState>;
    publishPostAction: (_prev: PostState | undefined, formData: FormData) => Promise<PostState>;
    archivePostAction: (_prev: PostState | undefined, formData: FormData) => Promise<PostState>;
    deletePostAction: (_prev: PostState | undefined, formData: FormData) => Promise<PostState>;
};
export {};
//# sourceMappingURL=actions.d.ts.map