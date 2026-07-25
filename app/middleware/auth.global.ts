const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isAuthRoute = createRouteMatcher(['/login', '/sign-up(.*)', '/sso-callback'])

export default defineNuxtRouteMiddleware(async (to) => {
  // Auth redirects only matter client-side: protected and auth routes are all
  // `ssr: false`, and `/` is public. Running this during the server prerender of
  // `/` would block on `until(isLoaded)` (Clerk never "loads" in that context).
  if (import.meta.server)
    return

  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded.value)
    await until(isLoaded).toBe(true)

  if (isProtectedRoute(to) && !isSignedIn.value) {
    return navigateTo(`/login?r=${encodeURIComponent(to.fullPath)}`)
  }

  if (isAuthRoute(to) && isSignedIn.value) {
    return navigateTo('/dashboard')
  }
})
