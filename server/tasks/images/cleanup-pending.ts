import { and, eq, lt } from 'drizzle-orm'
import { createDb } from '~~/server/db'
import { imagesTable } from '~~/server/db/schema'

const PENDING_TTL_MS = 24 * 60 * 60 * 1000

export default defineTask({
  meta: {
    name: 'images:cleanup-pending',
    description: 'Delete pending images older than 24 hours from R2 and the database',
  },
  async run() {
    // `cloudflare:workers` is a workerd-only virtual module. Importing it at the
    // top level crashes Node (dev via nitro-cloudflare-dev, and the build's
    // prerender step), so load it lazily here where only the production worker
    // runtime ever evaluates it.
    const { env } = await import('cloudflare:workers')

    const connectionString = env.HYPERDRIVE?.connectionString
    if (!connectionString) {
      throw new Error('Hyperdrive binding is not available')
    }

    const bucket = env.MEDIA_BUCKET
    if (!bucket) {
      throw new Error('MEDIA_BUCKET binding is not available')
    }

    const db = createDb(connectionString)
    const cutoff = new Date(Date.now() - PENDING_TTL_MS)

    const orphans = await db.query.imagesTable.findMany({
      where: and(
        eq(imagesTable.status, 'pending'),
        lt(imagesTable.createdAt, cutoff),
      ),
    })

    let deleted = 0
    for (const image of orphans) {
      await bucket.delete(image.key)
      await db.delete(imagesTable).where(eq(imagesTable.id, image.id))
      deleted += 1
    }

    return { result: { deleted } }
  },
})
