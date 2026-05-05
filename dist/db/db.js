// db.ts
import "server-only";
import postgres from "postgres";
export const createSqlClient = ({ postgresUrl, ssl = "require", max = 5, idleTimeout = 20, }) => {
    return postgres(postgresUrl, {
        ssl,
        max,
        idle_timeout: idleTimeout,
    });
};
