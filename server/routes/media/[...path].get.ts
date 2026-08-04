import { useMediaBucket } from '~~/server/utils/cloudflare'

// Dev-only substitute for the R2 custom domain (media.recipebean.app). In
// production NUXT_PUBLIC_MEDIA_BASE_URL points at that public domain, so this
// worker route is never requested. Locally it streams objects straight out of
// the MEDIA_BUCKET binding (Miniflare's on-disk R2) so uploaded images render.
export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const key = getRouterParam(event, 'path')
  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'Missing object key' })
  }

  const object = await useMediaBucket(event).get(key)
  if (!object) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found' })
  }

  setHeader(event, 'content-type', object.httpMetadata?.contentType ?? 'application/octet-stream')
  setHeader(event, 'cache-control', object.httpMetadata?.cacheControl ?? 'public, max-age=31536000, immutable')

  return object.body
})
