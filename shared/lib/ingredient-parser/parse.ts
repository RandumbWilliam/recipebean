import type { Quantity } from './schemas'
import { parseQuantity } from './quantity'
import { parseUnit } from './units'
import { normalizeInput } from './utils'

function removeLeadingOf(text: string): string {
  return text.trimStart().replace(/^of\s+/i, '').trimStart()
}

export function parseIngredient(raw: string) {
  let text = normalizeInput(raw)

  let quantity: Quantity | null = null
  let unit: string | null = null

  const qtyResult = parseQuantity(text)
  if (qtyResult) {
    quantity = qtyResult.quantity
    text = qtyResult.text

    const unitResult = parseUnit(text)
    if (unitResult) {
      unit = unitResult.unit
      text = unitResult.text
    }
  }

  const product = removeLeadingOf(text)

  return {
    raw,
    quantity,
    unit,
    product,
  }
}
