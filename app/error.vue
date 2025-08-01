<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/recipes' })
</script>

<template>
  <section class="flex h-screen flex-col items-center justify-center">
    <h2 class="mb-1 text-7xl font-bold">
      {{ error?.statusCode }}
    </h2>
    <p class="text-lg">
      {{ error?.message }}
    </p>
    <Button class="my-3" @click="handleError">
      Go Back
    </Button>
  </section>
</template>
