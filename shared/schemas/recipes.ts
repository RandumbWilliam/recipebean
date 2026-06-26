import type { Serialize } from 'nitropack/types'
import type { recipesTable } from '~~/server/db/schema'
import * as z from 'zod'

const headerSchema = z.object({
  type: z.literal('header'),
  title: z.string(),
})

const ingredientSchema = z.object({
  type: z.literal('ingredient'),
  raw: z.string(),
})

const instructionSchema = z.object({
  type: z.literal('instruction'),
  raw: z.string(),
})

const recipeIngredientSchema = z.discriminatedUnion('type', [
  headerSchema,
  ingredientSchema,
])

const recipeInstructionSchema = z.discriminatedUnion('type', [
  headerSchema,
  instructionSchema,
])

export const createRecipeSchema = z.object({
  name: z.string().min(1, { error: 'Required' }),
  imageUrl: z.string(),
  description: z.string(),
  prepTime: z.int().nonnegative(),
  cookTime: z.int().nonnegative(),
  servings: z.int().positive(),
  ingredients: z.array(recipeIngredientSchema),
  instructions: z.array(recipeInstructionSchema),
  notes: z.string(),
  categoryIds: z.array(z.string()),
})

export const toggleFavoriteSchema = z.object({
  isFavorite: z.boolean(),
})

export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>
export type RecipeInstruction = z.infer<typeof recipeInstructionSchema>
export type SerializedRecipe = Serialize<typeof recipesTable.$inferSelect>
