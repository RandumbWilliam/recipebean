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
