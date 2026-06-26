import type { SQL } from 'drizzle-orm'
import { and, eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~~/server/db'
import { recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/util/auth'

const querySchema = z.object({
  favorite: z.coerce.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const query = await getValidatedQuery(event, querySchema.parse)

  const filters: SQL[] = []

  if (query.favorite) {
    filters.push(eq(recipesTable.isFavorite, true))
  }

  const recipes = await db.query.recipesTable.findMany({
    where: and(
      eq(recipesTable.userId, user.id),
      ...filters,
    ),
  })

  return recipes
})
