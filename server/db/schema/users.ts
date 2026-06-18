import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { categoriesTable } from './categories'
import { recipesTable } from './recipes'

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: text().notNull().unique(),
  pfpId: integer().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  recipes: many(recipesTable),
  categories: many(categoriesTable),
}))

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
