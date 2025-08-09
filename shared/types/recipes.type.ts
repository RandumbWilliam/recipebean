import type { recipesModel } from '~~/server/db/schema'

export interface Measurement {
  quantity: number | null
  unit: string | null
}

export interface Ingredient {
  id: string
  type: 'ingredient'
  measurement: Measurement
  convertedMeasurements: Measurement[] | null
  product: string | null
  notes: string | null
}

export interface Instruction {
  id: string
  type: 'instruction'
  value: string
}

export interface Header {
  id: string
  type: 'header'
  value: string
}

export type RecipeIngredient = Header | Ingredient

export type RecipeInstruction = Header | Instruction

export type Recipe = typeof recipesModel.$inferSelect
