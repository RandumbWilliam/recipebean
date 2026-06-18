import { verifyWebhook } from '@clerk/nuxt/webhooks'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { usersTable } from '~~/server/db/schema'
import { randomPfpId } from '~~/shared/misc/pfp'

export default defineEventHandler(async (event) => {
  let evt
  try {
    evt = await verifyWebhook(event as Parameters<typeof verifyWebhook>[0])
  }
  catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid webhook signature' })
  }

  switch (evt.type) {
    case 'user.created': {
      await db
        .insert(usersTable)
        .values({ clerkId: evt.data.id, pfpId: randomPfpId() })
        .onConflictDoNothing({ target: usersTable.clerkId })
      break
    }
    case 'user.deleted': {
      if (evt.data.id)
        await db.delete(usersTable).where(eq(usersTable.clerkId, evt.data.id))
      break
    }
  }

  return { ok: true }
})
