import process from 'node:process'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import 'dotenv/config'

console.log(process.env.DATABASE_URL)

const db = drizzle(process.env.DATABASE_URL)

migrate(db, { migrationsFolder: './server/db/migrations' })

console.log('Migrations completed')

process.exit(0)
