import type { Ingredient } from '#shared/types/recipes.type'

export function format(ingredient: Ingredient) {
  let result = ''

  if (ingredient.measurement.quantity) {
    result += ingredient.measurement.quantity
  }

  if (ingredient.measurement.unit) {
    result += ` ${ingredient.measurement.unit}`
  }

  if (ingredient.convertedMeasurements && ingredient.convertedMeasurements.length > 0) {
    const convertedMeasurements = ingredient.convertedMeasurements.map(measurement => [measurement.quantity, measurement.unit].join(' ')).join(',')
    result += ` ${convertedMeasurements}`
  }

  if (ingredient.product) {
    result += ` ${ingredient.product}`
  }

  if (ingredient.notes) {
    if (ingredient.notes.startsWith('(')) {
      result += ` ${ingredient.notes}`
    }
    else {
      result += `, ${ingredient.notes}`
    }
  }

  return result.trim()
}
