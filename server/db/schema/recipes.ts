import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { recipesCategoriesTable } from './recipes-categories'
import { usersTable } from './users'

export const recipesTable = pgTable('recipes', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  name: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, table => [
  index('recipes_user_id_idx').on(table.userId),
])

export const recipesRelations = relations(recipesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [recipesTable.userId],
    references: [usersTable.id],
  }),
  recipesCategories: many(recipesCategoriesTable),
}))

export type Recipe = typeof recipesTable.$inferSelect
export type NewRecipe = typeof recipesTable.$inferInsert
