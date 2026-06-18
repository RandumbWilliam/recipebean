import { relations } from 'drizzle-orm'
import { index, pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core'
import { categoriesTable } from './categories'
import { recipesTable } from './recipes'

export const recipesCategoriesTable = pgTable('recipes_categories', {
  recipeId: uuid().references(() => recipesTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  categoryId: uuid().references(() => categoriesTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, table => [
  primaryKey({ columns: [table.recipeId, table.categoryId] }),
  index('recipes_categories_category_id_idx').on(table.categoryId),
])

export const recipesCategoriesRelations = relations(recipesCategoriesTable, ({ one }) => ({
  recipe: one(recipesTable, {
    fields: [recipesCategoriesTable.recipeId],
    references: [recipesTable.id],
  }),
  category: one(categoriesTable, {
    fields: [recipesCategoriesTable.categoryId],
    references: [categoriesTable.id],
  }),
}))

export type RecipeCategory = typeof recipesCategoriesTable.$inferSelect
export type NewRecipeCategory = typeof recipesCategoriesTable.$inferInsert
