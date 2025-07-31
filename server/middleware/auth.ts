import type { Session } from '#shared/types/sessions.type'
import type { User } from '#shared/types/users.type'
import {
  AUTH_SESSION_COOKIE_NAME,
  deleteSessionCookie,
} from '~~/server/helpers/auth'
import { validateSessionToken } from '~~/server/lib/sessions'

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, AUTH_SESSION_COOKIE_NAME)
  if (!sessionToken) {
    event.context.session = null
    event.context.user = null
    return
  }

  const { session, user } = await validateSessionToken(sessionToken)
  if (!session) {
    event.context.session = null
    event.context.user = null
    deleteSessionCookie(event)
    return
  }

  event.context.session = session
  event.context.user = user
})

declare module 'h3' {
  interface H3EventContext {
    session: Session | null
    user: User | null
  }
}
