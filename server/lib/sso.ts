import process from 'node:process'
import { Google } from 'arctic'

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  new URL('/api/auth/google/callback', process.env.APP_URL!).toString(),
)

export interface GoogleClaims {
  iss: string
  azp: string
  aud: string
  sub: string
  hd: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}
