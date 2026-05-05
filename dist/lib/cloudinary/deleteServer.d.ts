import "server-only";
import type { CldResourceType, DeleteCldAssetResult } from "./types";
type CreateDeleteCldAssetServerOptions = {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    safeFolder: string;
};
export declare const createDeleteCldAssetServer: ({ cloudName, apiKey, apiSecret, safeFolder, }: CreateDeleteCldAssetServerOptions) => (path: string, resourceType?: CldResourceType) => Promise<DeleteCldAssetResult>;
export {};
//# sourceMappingURL=deleteServer.d.ts.map