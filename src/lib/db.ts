// db.ts
import postgres from "postgres";

type CreateSqlClientOptions = {
  postgresUrl: string;
  ssl?: "require" | boolean;
  max?: number;
  idleTimeout?: number;
  globalKey?: string;
};

export const createSqlClient = ({
  postgresUrl,
  ssl = "require",
  max = 5,
  idleTimeout = 20,
}: CreateSqlClientOptions) => {
  return postgres(postgresUrl, {
    ssl,
    max,
    idle_timeout: idleTimeout,
  });
};

type SqlClient = ReturnType<typeof createSqlClient>;
export type SqlFragment = ReturnType<SqlClient>;
