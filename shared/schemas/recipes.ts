import type { Serialize } from 'nitropack/types'
import type { recipesTable } from '~~/server/db/schema'
import * as z from 'zod'

export const createRecipeSchema = z.object({
  name: z.string().min(1, { error: 'Required' }),
  imageUrl: z.string(),
  description: z.string(),
  prepTime: z.int().nonnegative(),
  cookTime: z.int().nonnegative(),
  servings: z.int().nonnegative(),
  ingredients: z.array(z.any()),
  instructions: z.array(z.object({
    raw: z.string(),
  })),
  notes: z.string(),
  categoryIds: z.array(z.string()),
})

export const toggleFavoriteSchema = z.object({
  isFavorite: z.boolean(),
})

export type SerializedRecipe = Serialize<typeof recipesTable.$inferSelect>
