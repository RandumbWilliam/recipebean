<script setup lang="ts">

</script>

<template>
  <div>
    <div class="flex h-[768px] flex-col">
      <header class="container flex h-20 items-center justify-between">
        <img src="/logo_primary.svg" width="180">

        <Button>Log in</Button>
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
            <Button>
              Get Started
            </Button>
          </div>
          <img src="~/assets/img/hero.png">
        </section>
      </main>
    </div>
    <footer />
  </div>
</template>
