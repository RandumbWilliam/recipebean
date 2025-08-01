import { z } from 'zod'
import { db } from '~~/server/db'

const paramsSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  isAuth(event)

  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const recipe = await db.query.recipesModel.findFirst({
    where: (recipesModel, { eq }) => eq(recipesModel.id, params.id),
  })

  if (!recipe) {
    throw createError({
      statusCode: 404,
      message: 'Recipe not found',
    })
  }

  return recipe
})
