export default defineNuxtRouteMiddleware(async (to) => {
  const { authUser } = useAuth()
  const path = to.matched[0]?.path || to.path

  if (path === '/')
    return

  if (!authUser.value && path.startsWith('/app')) {
    return navigateTo('/login', { replace: true })
  }

  if (authUser.value && path === '/login') {
    return navigateTo('/app', { replace: true })
  }
})
