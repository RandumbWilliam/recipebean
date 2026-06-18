<script setup lang="ts">
import RecipeCard from '~/components/RecipeCard.vue'
import AppSidebar from '~/components/sidebar/AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <div class="flex flex-col gap-6 py-6 px-6">
        <header class="flex items-start justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="text-4xl font-serif font-medium">
              All recipes
            </h1>
            <p class="text-sm text-muted-foreground">
              48 dishes worth making again
            </p>
          </div>
          <div>
            <Button>Add recipe</Button>
          </div>
        </header>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <RecipeCard v-for="i in 10" :key="i" :recipe="i" />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
