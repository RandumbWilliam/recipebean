import type { H3Event } from '#imports'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { usersTable } from '../db/schema'

export async function requireAuth(event: H3Event) {
  const { userId: clerkId } = event.context.auth()
  if (!clerkId)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkId),
  })
  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  return user
}
