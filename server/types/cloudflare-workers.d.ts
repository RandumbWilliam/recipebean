declare module 'cloudflare:workers' {
  // Bindings are typed at call sites via RecipebeanEnv in server/utils/cloudflare.ts.
  export const env: {
    MEDIA_BUCKET: {
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
      delete: (key: string) => Promise<void>
    }
    HYPERDRIVE: { connectionString: string }
  }
}
