<script setup lang="ts">
const props = defineProps<{
  recipe: any
}>()
</script>

<template>
  <div class="bg-white border w-full rounded-xl overflow-hidden h-70">
    <div class="flex items-center justify-center bg-muted h-40">
      Image
    </div>
    <div class="p-3">
      <h3 class="font-serif text-lg">
        {{ props.recipe }}
      </h3>
    </div>
  </div>
</template>
