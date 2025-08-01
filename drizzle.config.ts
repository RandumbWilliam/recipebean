import { defineConfig } from 'drizzle-kit'
import { connectionUrl } from './server/db'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/models/*.model.ts',
  out: './server/db/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: connectionUrl,
  },
})
