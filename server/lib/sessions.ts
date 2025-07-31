import type { Session } from '#shared/types/sessions.type'
import type { User } from '#shared/types/users.type'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { sessionsModel, usersModel } from '~~/server/db/schema'
import {
  encodeToken,
  EXPIRATION_TIME,
  SESSION_EXPIRATION,
} from '~~/server/helpers/auth'

export async function createSession(
  token: string,
  userId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<void> {
  const sessionToken = encodeToken(token)
  const session = {
    id: crypto.randomUUID(),
    userId,
    token: sessionToken,
    ipAddress,
    userAgent,
    expiresAt: SESSION_EXPIRATION(),
  }
  await db.insert(sessionsModel).values(session)
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionToken = encodeToken(token)
  const [row] = await db
    .select({ user: usersModel, session: sessionsModel })
    .from(sessionsModel)
    .innerJoin(usersModel, eq(sessionsModel.userId, usersModel.id))
    .where(eq(sessionsModel.token, sessionToken))

  if (!row) {
    return { session: null, user: null }
  }

  const { user, session } = row
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionsModel).where(eq(sessionsModel.id, session.id))
    return { session: null, user: null }
  }

  if (
    Date.now()
    >= session.expiresAt.getTime() - Math.ceil(EXPIRATION_TIME / 2)
  ) {
    session.expiresAt = SESSION_EXPIRATION()
    await db
      .update(sessionsModel)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionsModel.id, session.id))
  }

  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionsModel).where(eq(sessionsModel.id, sessionId))
}

export type SessionValidationResult = { session: Session, user: User } | { session: null, user: null }
