import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema/*',
  out: './drizzle',
  dbCredentials: {
    host: process.env.NUXT_DB_HOST ?? 'localhost',
    port: Number(process.env.NUXT_DB_PORT ?? 5432),
    user: process.env.NUXT_DB_USER ?? '',
    password: process.env.NUXT_DB_PASSWORD ?? '',
    database: process.env.NUXT_DB_NAME ?? '',
    ssl: false,
  },
})
