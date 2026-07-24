import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './server/db/schema/*',
  out: './drizzle',
  dbCredentials: {
    // Drizzle Kit connects directly to Postgres (never through Hyperdrive).
    // Point DATABASE_MIGRATIONS_URL at your local DB for local migrations, or
    // at the direct Neon URL (with sslmode=require) to migrate production.
    url: process.env.DATABASE_MIGRATIONS_URL!,
  },
})
