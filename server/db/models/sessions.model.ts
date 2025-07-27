import crypto from 'node:crypto'
import { relations } from 'drizzle-orm'
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { usersModel } from './users.model'

export const sessionsModel = mysqlTable('sessions', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
  userId: varchar({ length: 36 }).notNull().references(() => usersModel.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  token: varchar({ length: 255 }).notNull().unique(),
  expiresAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().onUpdateNow(),
})

export const sessionsRelations = relations(sessionsModel, ({ one }) => ({
  user: one(usersModel, {
    fields: [sessionsModel.userId],
    references: [usersModel.id],
  }),
}))
