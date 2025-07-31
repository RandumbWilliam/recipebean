import { db } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const { user } = isAuth(event)

  const recipes = await db.query.recipesModel.findMany({
    where: (recipesModel, { eq }) => eq(recipesModel.userId, user.id),
  })

  return recipes
})
