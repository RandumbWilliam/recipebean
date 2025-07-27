import type { SerializeObject } from 'nitropack'
import type { User } from '~/../shared/types/users.type'

export function useAuth() {
  const authUser = useState<SerializeObject<User> | null>('authUser', () => null)

  async function authenticate() {
    if (!authUser.value) {
      try {
        const user = await $fetch('/api/auth')

        authUser.value = user
      }
      catch (error) {
        console.error(error)
        authUser.value = null
      }
    }
  }

  return {
    authUser,
    authenticate,
  }
}
