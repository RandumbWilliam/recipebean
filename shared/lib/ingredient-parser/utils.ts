import { UNICODE_FRACTIONS } from './constants'

export function normalizeInput(input: string): string {
  // Remove leading and trailing spaces
  let text = input.trim()

  // Replace "en dash" and "em dash" with hyphen
  text = text.replace(/[–—]/g, '-')

  // Replace unicode fractions with ASCII fractions
  // leading space for mixed fractions
  for (const [symbol, replacement] of Object.entries(UNICODE_FRACTIONS)) {
    text = text.replaceAll(symbol, ` ${replacement}`)
  }

  // Replace hypen with space between measurements and units
  text = text.replace(/(\d[\d\s./]*)-(?=[a-z])/gi, '$1 ')

  // Collapse repeated whitespace
  text = text.replace(/\s+/g, ' ').trim()

  return text
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
