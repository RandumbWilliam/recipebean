import type { Ingredient } from '#shared/types/recipes.type'
import Fraction from 'fraction.js'

export function format(ingredient: Ingredient) {
  let result = ''

  if (ingredient.measurement.quantity) {
    const qty = new Fraction(ingredient.measurement.quantity)
    result += qty.simplify(0.001).toFraction(true)
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
