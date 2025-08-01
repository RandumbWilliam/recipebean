import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const usersModel = pgTable('users', {
  id: varchar({ length: 12 }).primaryKey().$defaultFn(() => nanoid(12)),
  googleId: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  image: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
})
