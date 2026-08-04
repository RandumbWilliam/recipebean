import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/db'
import { imagesTable } from '~~/server/db/schema'
import { requireAuth } from '~~/server/utils/auth'
import { useMediaBucket } from '~~/server/utils/cloudflare'
import {
  buildImageObjectKey,
  detectImageContentType,
  getPublicImageUrl,
  isAllowedImageType,
  MAX_IMAGE_BYTES,
  sanitizeOriginalFilename,
} from '~~/server/utils/images'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const db = useDb(event)
  const bucket = useMediaBucket(event)
  const config = useRuntimeConfig(event)

  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'Expected multipart form data' })
  }

  const filePart = form.find(part => part.name === 'file' && part.data)
  if (!filePart?.data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file' })
  }

  if (filePart.data.byteLength === 0 || filePart.data.byteLength > MAX_IMAGE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: 'Image must be between 1 byte and 5 MB' })
  }

  const detectedType = detectImageContentType(filePart.data)
  if (!detectedType || !isAllowedImageType(detectedType)) {
    throw createError({ statusCode: 400, statusMessage: 'Only JPEG, PNG, and WebP images are allowed' })
  }

  const decoder = new TextDecoder()
  const widthPart = form.find(part => part.name === 'width')?.data
  const heightPart = form.find(part => part.name === 'height')?.data
  const widthRaw = widthPart ? decoder.decode(widthPart) : null
  const heightRaw = heightPart ? decoder.decode(heightPart) : null
  const width = widthRaw ? Number.parseInt(widthRaw, 10) : null
  const height = heightRaw ? Number.parseInt(heightRaw, 10) : null

  if (
    (widthRaw && (!Number.isFinite(width) || width! <= 0))
    || (heightRaw && (!Number.isFinite(height) || height! <= 0))
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid image dimensions' })
  }

  const imageId = crypto.randomUUID()
  const key = buildImageObjectKey(user.id, imageId, detectedType)

  try {
    await bucket.put(key, filePart.data, {
      httpMetadata: {
        contentType: detectedType,
        cacheControl: 'public, max-age=31536000, immutable',
      },
    })

    const [image] = await db
      .insert(imagesTable)
      .values({
        id: imageId,
        userId: user.id,
        key,
        contentType: detectedType,
        sizeBytes: filePart.data.byteLength,
        width: width && Number.isFinite(width) ? width : null,
        height: height && Number.isFinite(height) ? height : null,
        originalFilename: sanitizeOriginalFilename(filePart.filename),
        status: 'pending',
      })
      .returning()

    if (!image) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to create image record' })
    }

    return {
      id: image.id,
      imageUrl: getPublicImageUrl(config.public.mediaBaseUrl, image.key),
      contentType: image.contentType,
      sizeBytes: image.sizeBytes,
      width: image.width,
      height: image.height,
    }
  }
  catch (error) {
    await bucket.delete(key).catch(() => undefined)
    await db.delete(imagesTable).where(eq(imagesTable.id, imageId)).catch(() => undefined)
    throw error
  }
})
