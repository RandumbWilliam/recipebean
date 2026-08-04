import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export type Database = NodePgDatabase<typeof schema>

// Cloudflare Workers forbid reusing a database connection across requests, so
// the client must be created per-request and never cached in module scope.
// Hyperdrive pools the underlying connection to the origin database, so
// creating a new client on each request is cheap, and it tears the client down
// automatically when the request ends (no manual `end()` required).
export function createDb(connectionString: string): Database {
  const pool = new Pool({ connectionString })
  return drizzle({ client: pool, schema, casing: 'snake_case' })
}

export function useDb(event: H3Event): Database {
  const cached = event.context.db as Database | undefined
  if (cached)
    return cached

  const cloudflare = event.context.cloudflare as
    | { env?: { HYPERDRIVE?: { connectionString: string } } }
    | undefined

  const connectionString = cloudflare?.env?.HYPERDRIVE?.connectionString
  if (!connectionString) {
    throw createError({ statusCode: 500, statusMessage: 'Hyperdrive binding is not available' })
  }

  const db = createDb(connectionString)
  event.context.db = db
  return db
}
