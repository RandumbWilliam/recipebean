export interface Measurement {
  quantity: number | null
  unit: string | null
}

export interface Ingredient {
  type: 'ingredient'
  measurement: Measurement
  convertedMeasurements: Measurement[] | null
  product: string | null
  notes: string | null
}

export interface Instruction {
  type: 'instruction'
  value: string
}

export interface Header {
  type: 'header'
  value: string
}

export type RecipeIngredient = Header | Ingredient

export type RecipeInstruction = Header | Instruction
