// Database connection using Neon PostgreSQL with Drizzle ORM
// For development, use the Replit PostgreSQL database (DATABASE_URL env var)

let db: any;
let pool: any;

try {
  // Try to use Neon serverless (for production)
  const { Pool, neonConfig } = require('@neondatabase/serverless');
  const { drizzle: drizzleNeon } = require('drizzle-orm/neon-serverless');
  const ws = require('ws');

  neonConfig.webSocketConstructor = ws;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzleNeon({ client: pool });
} catch (error) {
  // Fallback to direct PostgreSQL pool for development
  const { Pool: PgPool } = require('pg');
  
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  pool = new PgPool({ connectionString: process.env.DATABASE_URL });
  const { drizzle } = require('drizzle-orm/node-postgres');
  db = drizzle({ client: pool });
}

export { db, pool };
