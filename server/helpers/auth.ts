import type { H3Event } from 'h3'
import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { deleteCookie, setCookie } from 'h3'
import { createSession } from '~~/server/lib/sessions'

export const AUTH_SESSION_COOKIE_NAME = 'auth_session'

export const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30

export const SESSION_EXPIRATION = () => new Date(Date.now() + EXPIRATION_TIME)

export function generateToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export function encodeToken(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
}

export async function setAuthSession(event: H3Event, userId: string) {
  const sessionToken = generateToken()
  const ipAddress = getRequestIP(event, { xForwardedFor: true })
  const userAgent = getRequestHeader(event, 'user-agent')
  await createSession(sessionToken, userId, ipAddress, userAgent)
  setCookie(event, AUTH_SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: SESSION_EXPIRATION(),
    path: '/',
  })
}

export function deleteSessionCookie(event: H3Event) {
  deleteCookie(event, AUTH_SESSION_COOKIE_NAME)
}
