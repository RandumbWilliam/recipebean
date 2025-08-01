import type { User } from '#shared/types/users.type'
import type { SerializeObject } from 'nitropack'

export function useAuth() {
  const authUser = useState<SerializeObject<User> | null>('authUser', () => null)

  async function authenticate() {
    if (!authUser.value) {
      const user = await $fetch('/api/auth')

      authUser.value = user
    }
  }

  async function logout() {
    await $fetch('/api/auth/logout', {
      method: 'POST',
    })

    authUser.value = null

    return navigateTo('/', { replace: true })
  }

  return {
    authUser,
    authenticate,
    logout,
  }
}
