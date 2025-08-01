import type { OAuth2Tokens } from 'arctic'
import type { GoogleClaims } from '~~/server/lib/sso'
import { decodeIdToken } from 'arctic'
import { eq } from 'drizzle-orm'
import { getCookie } from 'h3'
import { db } from '~~/server/db'
import { usersModel } from '~~/server/db/schema'
import { setAuthSession } from '~~/server/helpers/auth'
import { google } from '~~/server/lib/sso'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  const storedState = getCookie(event, 'google_oauth_state') ?? null
  const codeVerifier = getCookie(event, 'google_code_verifier') ?? null

  if (
    code === null
    || state === null
    || storedState === null
    || codeVerifier === null
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  if (state !== storedState) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  let tokens: OAuth2Tokens

  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier)
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const claims = decodeIdToken(tokens.idToken()) as GoogleClaims

  const googleId = claims.sub

  const [existingUser] = await db
    .select()
    .from(usersModel)
    .where(eq(usersModel.googleId, googleId))

  if (existingUser) {
    await setAuthSession(event, existingUser.id)
  }
  else {
    const [user] = await db.insert(usersModel).values({
      googleId,
      name: claims.name,
    }).returning({ id: usersModel.id })

    await setAuthSession(event, user.id)
  }

  return await sendRedirect(event, '/recipes', 302)
})
