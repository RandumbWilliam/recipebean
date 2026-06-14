const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isAuthRoute = createRouteMatcher(['/login', '/sign-up(.*)', '/sso-callback'])

export default defineNuxtRouteMiddleware(async (to) => {
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
