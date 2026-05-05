export type DeleteCldAssetInput = {
    path: string;
    resourceType?: CldResourceType;
};
export type DeleteCldAssetResult = {
    ok: boolean;
    message?: string;
};
export type CldResourceType = "image" | "video" | "raw";
//# sourceMappingURL=types.d.ts.map