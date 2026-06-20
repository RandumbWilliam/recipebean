<script setup lang="ts">
import type { SerializedRecipe } from '~~/shared/schemas/recipes'

const props = defineProps<{
  recipe: SerializedRecipe
}>()
</script>

<template>
  <div class="bg-white border w-full rounded-xl overflow-hidden h-70">
    <div class="flex items-center justify-center bg-muted h-40">
      Image
    </div>
    <div class="p-3">
      <h3 class="font-serif text-lg">
        {{ props.recipe.name }}
      </h3>
    </div>
  </div>
</template>
