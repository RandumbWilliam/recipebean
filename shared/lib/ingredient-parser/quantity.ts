import type { Quantity } from './schemas'

const NUMBER_WORDS: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  half: 0.5,
  quarter: 0.25,
  dozen: 12,
}

function extractQuantity(input: string): {
  value: number
  raw: string
} | undefined {
  const text = input.trimStart()

  // mixed fraction
  let match = text.match(/^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)/)
  if (match) {
    const whole = Number(match[1])
    const numerator = Number(match[2])
    const denominator = Number(match[3])
    if (denominator !== 0) {
      return {
        value: whole + numerator / denominator,
        raw: match[0],
      }
    }
  }

  // simple fraction
  match = text.match(/^(\d+)\/(\d+)/)
  if (match) {
    const numerator = Number(match[1])
    const denominator = Number(match[2])
    if (denominator !== 0) {
      return {
        value: numerator / denominator,
        raw: match[0],
      }
    }
  }

  // real number
  match = text.match(/^\d+(?:\.\d+)?/)
  if (match) {
    return {
      value: Number(match[0]),
      raw: match[0],
    }
  }

  // number words
  match = text.match(/^[a-z]+/i)
  if (match) {
    const word = match[0].toLowerCase()
    const value = NUMBER_WORDS[word]
    if (value !== undefined) {
      return {
        value,
        raw: match[0],
      }
    }
  }

  return undefined
}

export function parseQuantity(text: string): {
  quantity: Quantity
  text: string
} | null {
  const minQty = extractQuantity(text)

  if (!minQty)
    return null

  text = text.slice(minQty.raw.length).trimStart()

  const rangeMatch = text.match(/^(?:-|to)\s*/i)
  if (rangeMatch) {
    text = text.slice(rangeMatch[0].length).trimStart()
    const maxQty = extractQuantity(text)

    if (maxQty) {
      text = text.slice(maxQty.raw.length).trimStart()

      return {
        quantity: {
          min: minQty.value,
          max: maxQty.value,
        },
        text,
      }
    }
  }

  return {
    quantity: {
      min: minQty.value,
      max: null,
    },
    text,
  }
}
