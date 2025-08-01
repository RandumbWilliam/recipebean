import type { RecipeIngredient, RecipeInstruction } from '#shared/types/recipes.type'
import { integer, json, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { usersModel } from './users.model'

export const recipesModel = pgTable('recipes', {
  id: varchar({ length: 12 }).primaryKey().$defaultFn(() => nanoid(12)),
  userId: varchar({ length: 12 }).notNull().references(() => usersModel.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  title: text().notNull(),
  description: text(),
  images: json().$type<string[]>(),
  cookTime: integer().notNull(),
  prepTime: integer().notNull(),
  servings: integer().notNull(),
  ingredients: json().$type<RecipeIngredient[]>().notNull(),
  instructions: json().$type<RecipeInstruction[]>().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
})
