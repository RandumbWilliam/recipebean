import { and, eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/util/auth'

const paramsSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const recipe = await db.query.recipesTable.findFirst({
    where: and(
      eq(recipesTable.userId, user.id),
      eq(recipesTable.id, params.id),
    ),
  })

  if (!recipe) {
    throw createError({
      status: 401,
      message: 'Missing recipe',
    })
  }

  return recipe
})
