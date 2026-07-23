import { UNIT_DEFS } from './constants'
import { escapeRegExp } from './utils'

export const UNIT_ALIASES = Object.entries(UNIT_DEFS)
  .flatMap(([unit, def]) =>
    def.aliases.map(alias => ({
      unit,
      alias,
      type: def.type,
    })),
  )
  .sort((a, b) => b.alias.length - a.alias.length)

function aliasToRegex(alias: string): string {
  return escapeRegExp(alias).replace(/\s+/g, '\\s+')
}

export function parseUnit(text: string): {
  unit: string
  text: string
} | null {
  for (const entry of UNIT_ALIASES) {
    const re = new RegExp(`^${aliasToRegex(entry.alias)}\\.? (?=\\s|$|\\)|,)`.replace(' ', ''), 'i')

    const match = text.match(re)
    if (match) {
      return {
        unit: entry.unit,
        text: text.slice(match[0].length).trimStart(),
      }
    }
  }

  return null
}
