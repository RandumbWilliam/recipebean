import process from 'node:process'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schema'

export const connectionUrl = (() => {
  const url = new URL('mysql://')
  url.host = process.env.DB_HOST || 'localhost'
  url.port = (process.env.DB_PORT || 3306).toString()
  url.pathname = process.env.DB_NAME!
  url.username = process.env.DB_USER!
  url.password = process.env.DB_PASS!
  return url.toString()
})()

export const db = drizzle({
  connection: connectionUrl,
  casing: 'snake_case',
  schema,
  mode: 'default',
})
