<script setup lang="ts">
import RecipeSearch from '~/components/RecipeSearch.vue'
import AppSidebar from '~/components/sidebar/AppSidebar.vue'
import MobileBottomNav from '~/components/sidebar/MobileBottomNav.vue'

const { toggleSearch } = useRecipeSearch()

// Cmd/Ctrl+K opens the recipe search from anywhere (Cmd/Ctrl+B is taken by the sidebar).
onKeyStroke('k', (e) => {
  if (e.metaKey || e.ctrlKey) {
    e.preventDefault()
    toggleSearch()
  }
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="pb-20 md:pb-0">
      <slot />
    </SidebarInset>
    <MobileBottomNav />
    <RecipeSearch />
  </SidebarProvider>
</template>
