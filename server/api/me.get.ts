import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema'
import { randomPfpId } from '~~/shared/misc/pfp'

export default defineEventHandler(async (event) => {
  const { userId } = event.context.auth()
  if (!userId)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const existing = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
    columns: { pfpId: true },
  })
  if (existing)
    return existing

  const [created] = await db
    .insert(users)
    .values({ clerkId: userId, pfpId: randomPfpId() })
    .onConflictDoNothing({ target: users.clerkId })
    .returning({ pfpId: users.pfpId })
  if (created)
    return created

  const row = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
    columns: { pfpId: true },
  })
  return row
})
