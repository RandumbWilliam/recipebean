export function generateId(prefix: string): string {
  return `${prefix}_${Math.floor(Math.random() * 10e10)}`
}
