import type { H3Event } from 'h3'

export interface RecipebeanR2Object {
  body: ReadableStream
  size: number
  httpMetadata?: {
    contentType?: string
    cacheControl?: string
  }
}

export interface RecipebeanR2Bucket {
  put: (
    key: string,
    value: ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob,
    options?: {
      httpMetadata?: {
        contentType?: string
        cacheControl?: string
      }
    },
  ) => Promise<unknown>
  get: (key: string) => Promise<RecipebeanR2Object | null>
  delete: (key: string) => Promise<void>
}

export interface RecipebeanEnv {
  MEDIA_BUCKET: RecipebeanR2Bucket
  HYPERDRIVE: { connectionString: string }
}

export function useCloudflareEnv(event: H3Event): RecipebeanEnv {
  const cloudflare = event.context.cloudflare as unknown as { env?: RecipebeanEnv } | undefined
  if (!cloudflare?.env) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare bindings are not available',
    })
  }
  return cloudflare.env
}

export function useMediaBucket(event: H3Event): RecipebeanR2Bucket {
  const bucket = useCloudflareEnv(event).MEDIA_BUCKET
  if (!bucket) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MEDIA_BUCKET binding is not available',
    })
  }
  return bucket
}
