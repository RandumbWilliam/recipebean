import { relations } from 'drizzle-orm'
import { index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const IMAGE_STATUSES = ['pending', 'ready'] as const
export type ImageStatus = (typeof IMAGE_STATUSES)[number]

export const imagesTable = pgTable('images', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id, {
    onDelete: 'cascade',
  }).notNull(),
  key: text().notNull().unique(),
  contentType: text().notNull(),
  sizeBytes: integer().notNull(),
  width: integer(),
  height: integer(),
  originalFilename: text(),
  status: text().$type<ImageStatus>().notNull().default('pending'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, table => [
  index('images_user_id_idx').on(table.userId),
  index('images_status_created_at_idx').on(table.status, table.createdAt),
])

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [imagesTable.userId],
    references: [usersTable.id],
  }),
}))

export type Image = typeof imagesTable.$inferSelect
export type NewImage = typeof imagesTable.$inferInsert
