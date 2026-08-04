export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const MAX_IMAGE_EDGE = 1920
export const ALLOWED_INPUT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const

export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ImageUploadError'
  }
}

export interface PreparedImage {
  blob: Blob
  width: number
  height: number
  contentType: string
  filename: string
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = document.createElement('img')
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new ImageUploadError('Could not read image file'))
    }
    img.src = url
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new ImageUploadError('Could not encode image'))
        return
      }
      resolve(blob)
    }, type, quality)
  })
}

export async function prepareRecipeImage(file: File): Promise<PreparedImage> {
  if (!(ALLOWED_INPUT_TYPES as readonly string[]).includes(file.type)) {
    throw new ImageUploadError('Only JPEG, PNG, WebP, and GIF images are allowed')
  }

  if (file.size > 25 * 1024 * 1024) {
    throw new ImageUploadError('Image is too large to process (max 25 MB before compression)')
  }

  const img = await loadImageElement(file)
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(img.naturalWidth, img.naturalHeight))
  const width = Math.max(1, Math.round(img.naturalWidth * scale))
  const height = Math.max(1, Math.round(img.naturalHeight * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new ImageUploadError('Could not process image')
  }
  ctx.drawImage(img, 0, 0, width, height)

  let blob = await canvasToBlob(canvas, 'image/webp', 0.8)
  let contentType = 'image/webp'
  let filename = 'recipe.webp'

  if (blob.size > MAX_IMAGE_BYTES) {
    blob = await canvasToBlob(canvas, 'image/jpeg', 0.8)
    contentType = 'image/jpeg'
    filename = 'recipe.jpg'
  }

  if (blob.size > MAX_IMAGE_BYTES) {
    blob = await canvasToBlob(canvas, 'image/jpeg', 0.65)
  }

  if (blob.size > MAX_IMAGE_BYTES) {
    throw new ImageUploadError('Image is still larger than 5 MB after compression')
  }

  return { blob, width, height, contentType, filename }
}

export interface UploadedImage {
  id: string
  imageUrl: string
  contentType: string
  sizeBytes: number
  width: number | null
  height: number | null
}

export async function uploadRecipeImage(file: File): Promise<UploadedImage> {
  const prepared = await prepareRecipeImage(file)
  const body = new FormData()
  body.append('file', prepared.blob, prepared.filename)
  body.append('width', String(prepared.width))
  body.append('height', String(prepared.height))

  return $fetch<UploadedImage>('/api/images', {
    method: 'POST',
    body,
  })
}
