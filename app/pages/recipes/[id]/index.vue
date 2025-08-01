<script setup lang="ts">
const route = useRoute()
const recipeId = route.params.id as string

const { data, status, error } = await useFetch(`/api/recipes/${recipeId}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.data.message,
  })
}
</script>

<template>
  <section class="pt-3">
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'success' && data">
      {{ data }}
    </div>
  </section>
</template>
