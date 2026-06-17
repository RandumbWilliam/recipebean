import { verifyWebhook } from '@clerk/nuxt/webhooks'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema'
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
        .insert(users)
        .values({ clerkId: evt.data.id, pfpId: randomPfpId() })
        .onConflictDoNothing({ target: users.clerkId })
      break
    }
    case 'user.deleted': {
      if (evt.data.id)
        await db.delete(users).where(eq(users.clerkId, evt.data.id))
      break
    }
  }

  return { ok: true }
})
