import type { usersModel } from '~~/server/db/schema'

export type User = typeof usersModel.$inferSelect
