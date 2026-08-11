import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

let dbInstance: NodePgDatabase | undefined;

/**
 * Creates the database connection lazily on first use.
 *
 * Importing this module never throws — even without `DATABASE_URL`.
 * The pool is only created (and `DATABASE_URL` required) when an API
 * route actually talks to the database, which keeps `next build` and
 * static rendering working in environments without a database.
 */
function getDb(): NodePgDatabase {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }

    const pool =
      globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
      });

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = pool;
    }

    dbInstance = drizzle(pool);
  }

  return dbInstance;
}

/**
 * Lazy `db` export — keeps the same API (`db.insert(...)`, `db.execute(...)`)
 * used by the API routes, but defers connection setup until first access.
 */
export const db = new Proxy({} as NodePgDatabase, {
  get: (_target, prop) => {
    // Don't initialize the DB for symbol lookups (inspection, thenables, etc.)
    if (typeof prop === "symbol") return undefined;
    const instance = getDb();
    const value = (instance as unknown as Record<string, unknown>)[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
