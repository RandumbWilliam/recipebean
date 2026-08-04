import { and, eq } from 'drizzle-orm'
import * as z from 'zod'
import { useDb } from '~~/server/db'
import { imagesTable, recipesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/utils/auth'
import { useMediaBucket } from '~~/server/utils/cloudflare'

const paramsSchema = z.object({
  id: z.uuid(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const db = useDb(event)
  const bucket = useMediaBucket(event)
  const params = await getValidatedRouterParams(event, paramsSchema.parse)

  const image = await db.query.imagesTable.findFirst({
    where: and(
      eq(imagesTable.id, params.id),
      eq(imagesTable.userId, user.id),
    ),
  })

  if (!image) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found' })
  }

  if (image.status !== 'pending') {
    throw createError({ statusCode: 400, statusMessage: 'Only pending images can be deleted' })
  }

  const attached = await db.query.recipesTable.findFirst({
    where: eq(recipesTable.imageId, image.id),
    columns: { id: true },
  })

  if (attached) {
    throw createError({ statusCode: 400, statusMessage: 'Image is attached to a recipe' })
  }

  await bucket.delete(image.key)
  await db.delete(imagesTable).where(eq(imagesTable.id, image.id))

  return { ok: true }
})
