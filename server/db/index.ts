import { drizzle } from 'drizzle-orm/node-postgres'

const config = useRuntimeConfig()

export const db = drizzle({
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
  },
})
