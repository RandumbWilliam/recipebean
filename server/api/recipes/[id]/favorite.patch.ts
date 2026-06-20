import { and, eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/util/auth'
import { toggleFavoriteSchema } from '~~/shared/schemas/recipes'

const paramsSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const { isFavorite } = await readValidatedBody(event, toggleFavoriteSchema.parse)

  const [recipe] = await db
    .update(recipesTable)
    .set({ isFavorite })
    .where(and(eq(recipesTable.id, params.id), eq(recipesTable.userId, user.id)))
    .returning()

  if (!recipe)
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })

  return recipe
})
