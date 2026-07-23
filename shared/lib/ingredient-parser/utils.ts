import { UNICODE_FRACTIONS } from './constants'

export function normalizeInput(input: string): string {
  // Remove leading and trailing spaces
  input = input.trim()

  // Replace "en dash" and "em dash" with hypen
  input = input.replace(/[–—]/g, '-')

  // Replace unicode fractions with ASCII fractions
  // leading space for mixed fractions
  for (const [symbol, replacement] of Object.entries(UNICODE_FRACTIONS)) {
    input = input.replaceAll(symbol, ` ${replacement}`)
  }

  // Replace hypen with space between measurements and units
  input = input.replace(/(\d[\d\s./]*)-(?=[a-z])/gi, '$1 ')

  // Collapse repeated whitespace
  input = input.replace(/\s+/g, ' ').trim()

  return input
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
