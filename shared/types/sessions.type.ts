import type { sessionsModel } from '~~/server/db/schema'

export type Session = typeof sessionsModel.$inferSelect
