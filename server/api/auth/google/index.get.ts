import { generateCodeVerifier, generateState } from 'arctic'
import { setCookie } from 'h3'
import { google } from '~~/server/lib/sso'

export default defineEventHandler(async (event) => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const scopes = ['openid', 'profile', 'email']
  const url = google.createAuthorizationURL(state, codeVerifier, scopes)

  setCookie(event, 'google_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
  })

  setCookie(event, 'google_code_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
  })

  await sendRedirect(event, url.toString(), 302)
})
