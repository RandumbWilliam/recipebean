import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/util/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const recipes = await db.query.recipesTable.findMany({
    where: (eq(recipesTable.userId, user.id)),
  })

  return recipes
})
