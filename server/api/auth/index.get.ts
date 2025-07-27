export default defineEventHandler(async (event) => {
  const { user } = isAuth(event)

  return user
})
