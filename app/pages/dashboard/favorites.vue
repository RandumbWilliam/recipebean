<script setup lang="ts">
import RecipeCard from '~/components/RecipeCard.vue'
import AppSidebar from '~/components/sidebar/AppSidebar.vue'

const { data, status } = await useFetch('/api/recipes', {
  query: {
    favorite: 'true',
  },
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <div class="flex flex-col gap-6 py-6 px-6">
        <header class="flex items-start justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="text-4xl font-serif font-medium">
              Favorite recipes
            </h1>
            <p v-if="status === 'success' && data" class="text-sm text-muted-foreground">
              {{ data.length }} {{ data.length === 1 ? 'recipe' : 'recipes' }}
            </p>
          </div>
          <div>
            <Button as-child>
              <NuxtLink to="/dashboard/new">
                Add recipe
              </NuxtLink>
            </Button>
          </div>
        </header>
        <template v-if="status === 'success' && data">
          <div v-if="data.length === 0" class="flex flex-col gap-3 h-120 items-center justify-center">
            <p class="text-muted-foreground italic">
              No favorites
            </p>
            <Button as-child>
              <NuxtLink to="/dashboard/new">
                Add recipe
              </NuxtLink>
            </Button>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <NuxtLink v-for="recipe in data" :key="recipe.id" :to="`/dashboard/${recipe.id}`">
              <RecipeCard :recipe />
            </NuxtLink>
          </div>
        </template>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
