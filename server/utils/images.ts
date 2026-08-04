import type { Image } from '~~/server/db/schema'
import type { Recipe } from '~~/server/db/schema/recipes'

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number]

const EXT_BY_TYPE: Record<AllowedImageType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export function isAllowedImageType(value: string): value is AllowedImageType {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(value)
}

export function extensionForContentType(contentType: AllowedImageType): string {
  return EXT_BY_TYPE[contentType]
}

export function buildImageObjectKey(userId: string, imageId: string, contentType: AllowedImageType): string {
  return `users/${userId}/images/${imageId}/original.${extensionForContentType(contentType)}`
}

export function getPublicImageUrl(mediaBaseUrl: string, key: string): string {
  const base = mediaBaseUrl.replace(/\/$/, '')
  return `${base}/${key}`
}

export function detectImageContentType(bytes: Uint8Array): AllowedImageType | null {
  if (bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return 'image/jpeg'
  }

  if (
    bytes.length >= 8
    && bytes[0] === 0x89
    && bytes[1] === 0x50
    && bytes[2] === 0x4E
    && bytes[3] === 0x47
    && bytes[4] === 0x0D
    && bytes[5] === 0x0A
    && bytes[6] === 0x1A
    && bytes[7] === 0x0A
  ) {
    return 'image/png'
  }

  if (
    bytes.length >= 12
    && bytes[0] === 0x52
    && bytes[1] === 0x49
    && bytes[2] === 0x46
    && bytes[3] === 0x46
    && bytes[8] === 0x57
    && bytes[9] === 0x45
    && bytes[10] === 0x42
    && bytes[11] === 0x50
  ) {
    return 'image/webp'
  }

  return null
}

export function sanitizeOriginalFilename(filename: string | undefined): string | null {
  if (!filename)
    return null
  const trimmed = filename.trim().slice(0, 255)
  if (!trimmed)
    return null
  return trimmed.replace(/[^\w.\- ()[\]]+/g, '_')
}

export function serializeRecipeWithImageUrl<T extends Recipe & { image?: Pick<Image, 'key'> | null }>(
  recipe: T,
  mediaBaseUrl: string,
) {
  const { image, ...rest } = recipe
  return {
    ...rest,
    imageUrl: image ? getPublicImageUrl(mediaBaseUrl, image.key) : null,
  }
}
