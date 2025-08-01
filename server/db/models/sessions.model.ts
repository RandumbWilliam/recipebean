import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { usersModel } from './users.model'

export const sessionsModel = pgTable('sessions', {
  id: varchar({ length: 12 }).primaryKey().$defaultFn(() => nanoid(12)),
  userId: varchar({ length: 12 }).notNull().references(() => usersModel.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  token: text().notNull().unique(),
  expiresAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
})

export const sessionsRelations = relations(sessionsModel, ({ one }) => ({
  user: one(usersModel, {
    fields: [sessionsModel.userId],
    references: [usersModel.id],
  }),
}))
