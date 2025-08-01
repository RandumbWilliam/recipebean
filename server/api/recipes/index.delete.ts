import { and, eq, inArray } from 'drizzle-orm'
import { db } from '~~/server/db'
import { recipesModel } from '~~/server/db/schema'
import { deleteRecipesDto } from '~~/shared/dtos/recipes.dto'

export default defineEventHandler(async (event) => {
  const { user } = isAuth(event)

  const deleteBody = await readValidatedBody(event, deleteRecipesDto.parse)

  await db.delete(recipesModel).where(
    and(
      inArray(recipesModel.id, deleteBody.ids),
      eq(recipesModel.userId, user.id),
    ),
  )
})
