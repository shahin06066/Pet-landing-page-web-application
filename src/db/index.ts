import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Keep one pool across hot-reloads in dev
const globalForDb = globalThis as typeof globalThis & {
  __pgPool?: Pool;
};

let dbInstance: NodePgDatabase | undefined;

// The pool is created lazily so importing this module never throws,
// even without DATABASE_URL — that keeps `next build` and static
// rendering working in environments without a database.
function getDb(): NodePgDatabase {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }

    const pool =
      globalForDb.__pgPool ??
      new Pool({
        connectionString: databaseUrl,
      });

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__pgPool = pool;
    }

    dbInstance = drizzle(pool);
  }

  return dbInstance;
}

// Proxy that defers connection setup until a route actually touches the db
export const db = new Proxy({} as NodePgDatabase, {
  get: (_target, prop) => {
    if (typeof prop === "symbol") return undefined;
    const instance = getDb();
    const value = (instance as unknown as Record<string, unknown>)[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
