import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "../shared/schema.js";

// Construct DATABASE_URL from individual parameters if available
let connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.DB_HOST) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

if (!connectionString) {
  throw new Error(
    "DATABASE_URL or individual DB parameters (DB_HOST, DB_PORT, etc.) must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
