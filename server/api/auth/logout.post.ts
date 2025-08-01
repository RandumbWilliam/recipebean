import { deleteSessionCookie } from '~~/server/helpers/auth'
import { invalidateSession } from '~~/server/lib/sessions'

export default defineEventHandler(async (event) => {
  const { session } = isAuth(event)

  await invalidateSession(session.id)

  deleteSessionCookie(event)
})
