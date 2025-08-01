const protectedRoutes = ['/recipes', '/account']

export default defineNuxtRouteMiddleware(async (to) => {
  const { authUser } = useAuth()
  const path = to.matched[0]?.path || to.path
  const isProtected = protectedRoutes.some(route => path.startsWith(route))

  if (path === '/')
    return

  if (!authUser.value && isProtected) {
    return navigateTo('/login', { replace: true })
  }

  if (authUser.value && path === '/login') {
    return navigateTo('/recipes', { replace: true })
  }
})
