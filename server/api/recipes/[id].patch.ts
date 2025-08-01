import { createRecipeDto } from '#shared/dtos/recipes.dto'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '~~/server/db'
import { recipesModel } from '~~/server/db/schema'

const paramsSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  isAuth(event)

  const params = await getValidatedRouterParams(event, paramsSchema.parse)
  const recipeBody = await readValidatedBody(event, createRecipeDto.parse)

  await db.update(recipesModel)
    .set(recipeBody)
    .where(eq(recipesModel.id, params.id))
})
