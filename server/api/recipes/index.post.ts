import { and, eq } from 'drizzle-orm'
import { useDb } from '~~/server/db'
import { imagesTable, recipesCategoriesTable, recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/utils/auth'
import { createRecipeSchema } from '~~/shared/schemas/recipes'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const db = useDb(event)

  const { categoryIds, imageId, ...recipeData } = await readValidatedBody(event, createRecipeSchema.parse)

  const recipeId = await db.transaction(async (tx) => {
    if (imageId) {
      const image = await tx.query.imagesTable.findFirst({
        where: and(
          eq(imagesTable.id, imageId),
          eq(imagesTable.userId, user.id),
        ),
      })

      if (!image) {
        throw createError({ statusCode: 400, statusMessage: 'Image not found' })
      }

      if (image.status !== 'pending') {
        throw createError({ statusCode: 400, statusMessage: 'Image is not available' })
      }

      await tx
        .update(imagesTable)
        .set({ status: 'ready' })
        .where(eq(imagesTable.id, imageId))
    }

    const [recipe] = await tx
      .insert(recipesTable)
      .values({
        userId: user.id,
        imageId,
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
