import type { SerializedRecipe } from '~~/shared/schemas/recipes'

export interface CurrentUser {
  firstName: string | null
  lastName: string | null
  email: string
  pfpId: number
  recipeCount: number
}

/**
 * The signed-in user as the dashboard chrome shows it: name and email from
 * Clerk, avatar from our own profile row, and the cookbook size. Null until
 * all of that has loaded. The sidebar footer and the mobile top bar both call
 * this; the fetches are keyed, so the second caller costs no extra request.
 */
export function useCurrentUser() {
  const { user, isLoaded } = useUser()
  // Keyed so the account page shares this entry and a saved avatar lands in
  // the menu without a second request.
  const { data: me } = useFetch('/api/me', { key: 'me' })

  // Shares the dashboard list page's asyncData entry — see RecipeSearch for
  // why the key has to be explicit — so the count costs no extra request and
  // refetches whenever a recipe is added or deleted.
  const { data: recipes } = useFetch('/api/recipes', {
    key: 'recipes',
    default: () => [] as SerializedRecipe[],
    dedupe: 'defer',
  })

  return computed<CurrentUser | null>(() =>
    isLoaded.value && user.value && me.value
      ? {
          firstName: user.value.firstName,
          lastName: user.value.lastName,
          email: user.value.primaryEmailAddress?.emailAddress ?? '',
          pfpId: me.value.pfpId,
          recipeCount: recipes.value.length,
        }
      : null,
  )
}
