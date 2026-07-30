import type { Ingredient } from './schemas'
import { UNICODE_FRACTIONS } from './constants'

const ASCII_TO_UNICODE: Record<string, string> = Object.fromEntries(
  Object.entries(UNICODE_FRACTIONS).map(([symbol, ascii]) => [ascii, symbol]),
)

const MAX_DENOMINATOR = 16
const EPSILON = 1e-6

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a || 1
}

function toFraction(fractional: number): { numerator: number, denominator: number } | null {
  let bestNum = 1
  let bestDen = 1
  let bestError = Math.abs(fractional - 1)

  for (let den = 1; den <= MAX_DENOMINATOR; den++) {
    const num = Math.round(fractional * den)
    if (num === 0 || num === den)
      continue
    const error = Math.abs(fractional - num / den)
    if (error < bestError - EPSILON || (Math.abs(error - bestError) < EPSILON && den < bestDen)) {
      bestError = error
      bestNum = num
      bestDen = den
    }
  }

  if (bestError > EPSILON)
    return null

  const divisor = gcd(bestNum, bestDen)
  return {
    numerator: bestNum / divisor,
    denominator: bestDen / divisor,
  }
}

function formatQuantityValue(n: number): string {
  const sign = n < 0 ? '-' : ''
  const abs = Math.abs(n)

  if (Number.isInteger(abs) || Math.abs(abs - Math.round(abs)) < EPSILON) {
    return `${sign}${Math.round(abs)}`
  }

  const whole = Math.floor(abs)
  const fractional = abs - whole
  const fraction = toFraction(fractional)

  if (!fraction) {
    return `${sign}${Number(abs.toPrecision(6))}`
  }

  const ascii = `${fraction.numerator}/${fraction.denominator}`
  const unicode = ASCII_TO_UNICODE[ascii]

  if (whole === 0) {
    return `${sign}${unicode ?? ascii}`
  }

  if (unicode) {
    return `${sign}${whole}${unicode}`
  }

  return `${sign}${whole} ${ascii}`
}

export function formatIngredient(ingredient: Ingredient): string {
  const parts: string[] = []

  if (ingredient.quantity) {
    const { min, max } = ingredient.quantity
    const qty
      = max != null
        ? `${formatQuantityValue(min)}-${formatQuantityValue(max)}`
        : formatQuantityValue(min)
    parts.push(qty)
  }

  if (ingredient.unit)
    parts.push(ingredient.unit)

  if (ingredient.product)
    parts.push(ingredient.product)

  let result = parts.join(' ')

  if (ingredient.comments)
    result += `, ${ingredient.comments}`

  return result
}
