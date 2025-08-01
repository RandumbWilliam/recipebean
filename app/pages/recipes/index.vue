<script setup lang="ts">
import { CookingPot, Plus } from 'lucide-vue-next'

const { data, status } = useFetch('/api/recipes')
</script>

<template>
  <section class="grid h-full grid-rows-[auto_1fr] gap-3 pt-3">
    <Button as-child class="absolute right-3 bottom-3 rounded-full" size="icon">
      <NuxtLink to="/recipes/new">
        <Plus />
      </NuxtLink>
    </Button>

    <h1
      class="
        text-2xl font-bold
        sm:text-3xl
      "
    >
      Your Recipes
    </h1>
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'success' && data" class="h-full">
      <div
        v-if="data.length === 0" class="
          flex h-full flex-col items-center justify-center rounded-lg bg-muted
        "
      >
        <p class="text-muted-foreground">
          No Recipes.
        </p>
        <Button as-child>
          <NuxtLink to="/recipes/new">
            Create
          </NuxtLink>
        </Button>
      </div>
      <div
        v-else class="
          grid grid-cols-1 gap-3
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <NuxtLink v-for="recipe in data" :key="recipe.id" :to="`/recipes/${recipe.id}`">
          <div
            class="
              flex h-24 w-full flex-row overflow-hidden rounded-md border
              sm:h-64 sm:flex-col
            "
          >
            <div
              class="
                flex aspect-4/3 h-full items-center justify-center bg-primary
                sm:aspect-auto sm:h-40
              "
            >
              <CookingPot class="text-primary-foreground opacity-20" />
            </div>
            <div
              class="
                flex h-full w-full flex-col justify-between p-1.5
                sm:h-auto sm:flex-1
              "
            >
              <p class="line-clamp-2 font-medium">
                {{ recipe.title }}
              </p>
              <div class="flex h-5 gap-2 text-sm text-muted-foreground">
                <p>{{ recipe.cookTime + recipe.prepTime }} Mins</p>
                <div class="h-full w-px shrink-0 bg-border" />
                <p>{{ recipe.servings }} Serving</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
