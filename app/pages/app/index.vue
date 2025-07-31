<script setup lang="ts">
const { data, status } = useFetch('/api/recipes')
</script>

<template>
  <main>
    <section>
      <div v-if="status === 'pending'">
        Loading...
      </div>
      <div v-else-if="status === 'success' && data">
        <div v-for="recipe in data" :key="recipe.id">
          {{ recipe.name }}
        </div>
      </div>
    </section>
  </main>
</template>
