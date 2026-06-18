import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { usersTable } from '~~/server/db/schema'
import { randomPfpId } from '~~/shared/misc/pfp'

export default defineEventHandler(async (event) => {
  const { userId } = event.context.auth()
  if (!userId)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const existing = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, userId),
    columns: { pfpId: true },
  })
  if (existing)
    return existing

  const [created] = await db
    .insert(usersTable)
    .values({ clerkId: userId, pfpId: randomPfpId() })
    .onConflictDoNothing({ target: usersTable.clerkId })
    .returning({ pfpId: usersTable.pfpId })
  if (created)
    return created

  const row = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, userId),
    columns: { pfpId: true },
  })
  return row
})
