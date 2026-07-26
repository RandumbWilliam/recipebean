/**
 * Shared state for the global recipe search command palette.
 * A single dialog is mounted in the dashboard layout; every entry point
 * (sidebar input, collapsed rail icon, mobile nav, Cmd/Ctrl+K) toggles it here.
 */
export function useRecipeSearch() {
  const open = useState('recipe-search-open', () => false)

  function openSearch() {
    open.value = true
  }

  function toggleSearch() {
    open.value = !open.value
  }

  return { open, openSearch, toggleSearch }
}
