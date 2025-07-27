function parseNumber(numberStr: string): number {
  const [numeratorStr, denominatorStr] = numberStr.split('/')
  const numerator = Number(numeratorStr)
  const denominator = Number(denominatorStr || 1)
  return numerator / denominator
}

function normalizeUnicode(str: string): string {
  const unicodeFractionRegex = /[\u00BC-\u00BE\u2150-\u215E]/g
  const unicodeSpaceRegex = /[\u00A0\u1680\u2002-\u200B\u202F\u205F\u3000\uFEFF]/g
  const unicodeSlashRegex = /[\u0337\u0338\u2044\u2215\uFF0F]/g
  const unicodeDashRegex = /[\u00AD\u058A\u2010\u2011\u2043\u207B\u208B\uFE63\uFF0D\u2012-\u2015\u2E3A\u2E3B\uFE58\u02D7\u2212\u2796]/g

  const normalizedStr = str.replace(unicodeFractionRegex, unicode => ` ${unicode.normalize('NFKC')} `).replace(unicodeSlashRegex, '/').replace(unicodeSpaceRegex, ' ').replace(unicodeDashRegex, '-')

  return normalizedStr
}

function preprocess(str: string): string {
  str = normalizeUnicode(str)

  // replaces 'and' and '&' between a whole number and a fraction (mixed fractions)
  str = str.replace(/(?<=\d)(\s*(and|&)\s*)(?=\d\/\d)/gi, ' ')

  // repalce multiple spaces with single space
  str = str.replace(/\s{2,}/g, ' ')

  return str.trim()
}

function extractMeasurement(ingredientStr: string): { measurement: measurement, ingredientStrNoMeasurement: string } {
  const measurement: measurement = {
    quantity: null,
    unit: null,
  }

  const quantityMatch
    = ingredientStr.match(/^(\d+\s+\d+\/\d+)/) // mixed fraction e.g., "1 1/2"
      || ingredientStr.match(/^(\d+\/\d+)/) // plain fraction e.g., "3/4"
      || ingredientStr.match(/^(\d*\.\d+)/) // decimal number e.g., "1.5"
      || ingredientStr.match(/^(\d+)/) // whole number e.g., "2"

  if (quantityMatch) {
    const quantityStr = quantityMatch[1]
    let quantity: number

    if (quantityStr.includes(' ')) {
      const [whole, fraction] = quantityStr.split(' ')
      quantity = parseNumber(whole) + parseNumber(fraction)
    }
    else {
      quantity = parseNumber(quantityStr)
    }

    ingredientStr = ingredientStr.substring(quantityMatch[0].length).trim()

    measurement.quantity = quantity
  }

  const unitRegexes: Record<string, RegExp> = {
    'fluid ounce': /^(fluid\s+ounces?|fl\s+ounces?|fluid\s+oz|fl\s+oz)\b/i,
    'cup': /^(cups?|c)\b/i,
    'pint': /^(pints?|pt\.?)\b/i,
    'quart': /^(quarts?|qt)\b/i,
    'gallon': /^(gallons?|gal)\b/i,
    'tablespoon': /^(tablespoons?|tbsp)\b/i,
    'teaspoon': /^(teaspoons?|tsp)\b/i,
    'milliliter': /^(milliliters?|ml)\b/i,
    'liter': /^(liters?|L)\b/i,
    'ounce': /^(ounces?|oz)\b/i,
    'pound': /^(pounds?|lb)\b/i,
    'milligram': /^(milligrams?|mg)\b/i,
    'gram': /^(grams?|g)\b/i,
    'kilogram': /^(kilograms?|kg)\b/i,
    'inch': /^(inches?|in)\b/i,
    'centimeter': /^(centimeters?|cm)\b/i,
    'pinch': /^(pinch)\b/i,
    'dash': /^(dash)\b/i,
    'handful': /^(handful)\b/i,
    'clove': /^(cloves?)\b/i,
    'stick': /^(sticks?)\b/i,
    'can': /^(cans?)\b/i,
    'pack': /^(packs?)\b/i,
    'package': /^(packages?)\b/i,
    'small': /^(small|sm)\b/i,
    'medium': /^(medium|med)\b/i,
    'large': /^(large|lg)\b/i,
  }

  for (const [unit, unitRegex] of Object.entries(unitRegexes)) {
    const unitMatch = ingredientStr.match(unitRegex)
    if (unitMatch) {
      ingredientStr = ingredientStr.substring(unitMatch[0].length).trim()

      measurement.unit = unit
      break
    }
  }

  return { measurement, ingredientStrNoMeasurement: ingredientStr.trim() }
}

function extractConvertedMeasurements(ingredientStrNoMeasurement: string): {
  convertedMeasurements: measurement[]
  ingredientStrNoMeasurments: string
} {
  const parenthesesMatch = ingredientStrNoMeasurement.match(/^\(([^)]+)\)/)

  const convertedMeasurements: measurement[] = []
  if (parenthesesMatch) {
    const measurementStrs = parenthesesMatch[1].split(/\s*[;,]\s*/).map(s => s.trim())
    for (const measurementStr of measurementStrs) {
      const { measurement, ingredientStrNoMeasurement } = extractMeasurement(measurementStr)

      if (ingredientStrNoMeasurement) {
        measurement.unit = measurement.unit === null ? ingredientStrNoMeasurement : `${measurement.unit} ${ingredientStrNoMeasurement}`
      }

      convertedMeasurements.push(measurement)
    }

    ingredientStrNoMeasurement = ingredientStrNoMeasurement.substring(parenthesesMatch[0].length).trim()
  }

  return { convertedMeasurements, ingredientStrNoMeasurments: ingredientStrNoMeasurement }
}

function extractProductNotes(ingredientStrNoMeasurments: string): { product: string | null, notes: string | null } {
  // remove 'of' from beginning
  ingredientStrNoMeasurments = ingredientStrNoMeasurments.replace(/^of\s/i, '').trim()

  const splitMatch = ingredientStrNoMeasurments.match(/[,(]/) // Match first comma or parenthesis
  if (!splitMatch) {
    return { product: ingredientStrNoMeasurments.trim(), notes: null }
  }

  const splitIndex = splitMatch.index!
  const product = ingredientStrNoMeasurments.slice(0, splitIndex).trim()
  let notes = ingredientStrNoMeasurments.slice(splitIndex).trim()

  // If the split was by a comma, remove the comma from the beginning of notes
  if (notes.startsWith(',')) {
    notes = notes.slice(1).trim()
  }

  return { product, notes }
}

export function parse(ingredientStr: string): ingredient {
  const result: ingredient = {
    measurement: {
      quantity: null,
      unit: null,
    },
    convertedMeasurements: [],
    product: null,
    notes: null,
  }

  ingredientStr = preprocess(ingredientStr)

  const { measurement, ingredientStrNoMeasurement } = extractMeasurement(ingredientStr)
  result.measurement = measurement

  const { convertedMeasurements, ingredientStrNoMeasurments } = extractConvertedMeasurements(ingredientStrNoMeasurement)
  result.convertedMeasurements = convertedMeasurements

  const { product, notes } = extractProductNotes(ingredientStrNoMeasurments)
  result.product = product
  result.notes = notes

  return result
}

export interface measurement {
  quantity: number | null
  unit: string | null
}

export interface ingredient {
  measurement: measurement
  convertedMeasurements: measurement[] | null
  product: string | null
  notes: string | null
}
