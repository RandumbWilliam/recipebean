import { z } from 'zod'

const measurementDto = z.object({
  quantity: z.coerce.number().nullable(),
  unit: z.string().nullable(),
})

const ingredientDto = z.object({
  type: z.literal('ingredient'),
  measurement: measurementDto,
  convertedMeasurements: z.array(measurementDto).nullable(),
  product: z.string().nullable(),
  notes: z.string().nullable(),
})

const instructionDto = z.object({
  type: z.literal('instruction'),
  value: z.string().min(1, { message: 'Required' }),
})

const headerDto = z.object({
  type: z.literal('header'),
  value: z.string().min(1, { message: 'Required' }),
})

const recipeIngredientDto = z.discriminatedUnion('type', [headerDto, ingredientDto])

const recipeInstructionDto = z.discriminatedUnion('type', [headerDto, instructionDto])

export const createRecipeDto = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
  images: z.array(z.string()).nullish(),
  servings: z.number().min(1),
  cookTime: z.number({ message: '' }).nonnegative(),
  prepTime: z.number({ message: '' }).nonnegative(),
  ingredients: z.array(recipeIngredientDto),
  instructions: z.array(recipeInstructionDto),
})
