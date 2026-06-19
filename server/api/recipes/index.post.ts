import { db } from '~~/server/db'
import { recipesCategoriesTable, recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/util/auth'
import { createRecipeSchema } from '~~/shared/schemas/recipes'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const { categoryIds, ...recipeData } = await readValidatedBody(event, createRecipeSchema.parse)

  const recipeId = await db.transaction(async (tx) => {
    const [recipe] = await tx
      .insert(recipesTable)
      .values({
        userId: user.id,
        ...recipeData,
      })
      .returning()

    if (categoryIds.length > 0) {
      await tx
        .insert(recipesCategoriesTable)
        .values(categoryIds.map(categoryId => ({
          recipeId: recipe!.id,
          categoryId,
        })))
    }

    return recipe!.id
  })

  return recipeId
})
