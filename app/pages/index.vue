<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <div class="flex h-[768px] flex-col">
      <header class="container flex h-20 items-center justify-between">
        <NuxtLink to="/">
          <img src="/logo_primary.svg" width="180">
        </NuxtLink>

        <NuxtLink to="/login">
          <Button>
            Log in
          </Button>
        </NuxtLink>
      </header>
      <main class="container flex flex-1 justify-center">
        <section class="grid grid-cols-2 items-center gap-12">
          <div class="space-y-3">
            <h1 class="text-6xl font-bold">
              Recipe Book for Beans
            </h1>
            <p class="text-xl">
              Simply save your recipes.
            </p>
            <NuxtLink to="/login">
              <Button>
                Get Started
              </Button>
            </NuxtLink>
          </div>
          <img src="~/assets/img/hero.png">
        </section>
      </main>
    </div>
    <footer />
  </div>
</template>
