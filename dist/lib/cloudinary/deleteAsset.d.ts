export type DeleteCldAssetInput = {
    path: string;
    resourceType?: "image" | "video" | "raw";
};
export type DeleteCldAssetResult = {
    ok: boolean;
    message?: string;
};
export declare function deleteCldAsset({ path, resourceType, }: DeleteCldAssetInput): Promise<DeleteCldAssetResult>;
//# sourceMappingURL=deleteAsset.d.ts.map