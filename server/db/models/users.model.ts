import crypto from 'node:crypto'
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const usersModel = mysqlTable('users', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
  googleId: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  image: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().onUpdateNow(),
})
