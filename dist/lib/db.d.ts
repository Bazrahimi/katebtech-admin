import postgres from "postgres";
type CreateSqlClientOptions = {
    postgresUrl: string;
    ssl?: "require" | boolean;
    max?: number;
    idleTimeout?: number;
    globalKey?: string;
};
export declare const createSqlClient: ({ postgresUrl, ssl, max, idleTimeout, }: CreateSqlClientOptions) => postgres.Sql<{}>;
type SqlClient = ReturnType<typeof createSqlClient>;
export type SqlFragment = ReturnType<SqlClient>;
export {};
//# sourceMappingURL=db.d.ts.map