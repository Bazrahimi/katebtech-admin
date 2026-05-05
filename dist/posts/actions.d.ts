import "server-only";
import type { PostActionState, PostState } from "./definitions";
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
    featurePostAction: (_prev: PostActionState | undefined, formData: FormData) => Promise<PostActionState>;
    publishPostAction: (_prev: PostActionState | undefined, formData: FormData) => Promise<PostActionState>;
    archivePostAction: (_prev: PostActionState | undefined, formData: FormData) => Promise<PostActionState>;
    deletePostAction: (_prev: PostActionState | undefined, formData: FormData) => Promise<PostActionState>;
};
export {};
//# sourceMappingURL=actions.d.ts.map