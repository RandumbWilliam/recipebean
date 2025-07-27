import type { H3Event } from 'h3'

export function isAuth(event: H3Event) {
  const { session, user } = event.context

  if (!session || !user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
    })
  }

  return { session, user }
}
