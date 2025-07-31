import type { RecipeIngredient, RecipeInstruction } from '#shared/types/recipes.type'
import crypto from 'node:crypto'
import { int, json, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { usersModel } from './users.model'

export const recipesModel = mysqlTable('recipes', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
  userId: varchar({ length: 36 }).notNull().references(() => usersModel.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  name: text().notNull(),
  description: text(),
  images: json().$type<string[]>(),
  cookTime: int().notNull(),
  prepTime: int().notNull(),
  servings: int().notNull(),
  ingredients: json().$type<RecipeIngredient[]>().notNull(),
  instructions: json().$type<RecipeInstruction[]>().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().onUpdateNow(),
})
