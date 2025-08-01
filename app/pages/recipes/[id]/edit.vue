<script setup lang="ts">
import type { CreateRecipeDto } from '#shared/dtos/recipes.dto'
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const recipeId = route.params.id as string

const { data, status } = await useFetch(`/api/recipes/${recipeId}`, { deep: true })

const loading = ref(false)

async function onSubmit(values: CreateRecipeDto) {
  try {
    if (!loading.value) {
      loading.value = true

      await $fetch(`/api/recipes/${recipeId}`, {
        method: 'PATCH',
        body: values,
      })

      return navigateTo(`/recipes/${recipeId}`)
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
      <div v-if="status === 'pending'">
        Loading...
      </div>
      <div v-else-if="status === 'success' && data" class="w-xl">
        <div class="mb-6 flex items-center gap-3">
          <Button as-child size="icon">
            <NuxtLink :to="`/recipes/${recipeId}`">
              <ArrowLeft />
            </NuxtLink>
          </Button>
          <h2 class="text-2xl font-bold">
            Edit Recipe
          </h2>
        </div>
        <div class="flex flex-col gap-6">
          <RecipeForm id="create-recipe" :initial-values="data" @submit="onSubmit" />
          <div class="flex justify-end gap-1.5">
            <Button type="button" variant="outline">
              <NuxtLink :to="`/recipes/${recipeId}`">
                Cancel
              </NuxtLink>
            </Button>
            <Button type="submit" form="create-recipe" :loading="loading">
              Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
