<script setup lang="ts">
import type { CreateRecipeDto } from '#shared/dtos/recipes.dto'
import { ArrowLeft } from 'lucide-vue-next'

const loading = ref(false)

async function onSubmit(values: CreateRecipeDto) {
  try {
    if (!loading.value) {
      loading.value = true

      await $fetch('/api/recipes', {
        method: 'POST',
        body: values,
      })

      return navigateTo('/recipes')
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <section class="flex flex-col items-center py-6">
      <div class="w-full max-w-xl">
        <div class="mb-6 flex items-center gap-3">
          <NuxtLink to="/recipes">
            <Button size="icon">
              <ArrowLeft />
            </Button>
          </NuxtLink>
          <h2 class="text-2xl font-bold">
            Create Recipe
          </h2>
        </div>
        <div class="flex flex-col gap-6">
          <RecipeForm id="create-recipe" @submit="onSubmit" />
          <div class="flex justify-end gap-1.5">
            <NuxtLink to="/recipes">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </NuxtLink>
            <Button type="submit" form="create-recipe" :loading="loading">
              Create
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
