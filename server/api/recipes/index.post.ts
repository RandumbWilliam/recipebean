import { createRecipeDto } from '#shared/dtos/recipes.dto'
import { db } from '~~/server/db'
import { recipesModel } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const { user } = isAuth(event)

  const recipeBody = await readValidatedBody(event, createRecipeDto.parse)

  const [recipe] = await db.insert(recipesModel)
    .values({ userId: user.id, ...recipeBody })
    .returning({ id: recipesModel.id })

  return recipe.id
})
