import * as z from 'zod'

const quantitySchema = z.object({
  min: z.number(),
  max: z.number().nullable(),
})

export type Quantity = z.infer<typeof quantitySchema>

export const ingredientSchema = z.object({
  type: z.literal('ingredient'),
  raw: z.string(),
  product: z.string().default(''),
  quantity: quantitySchema.nullable().default(null),
  unit: z.string().nullable().default(null),
  comments: z.string().nullable().default(null),
  scalable: z.boolean().default(false),
})
