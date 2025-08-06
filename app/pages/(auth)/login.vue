<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <header>
      <NuxtLink to="/" class="absolute top-2 left-2">
        <img
          src="/logo_primary.svg" class="
            w-[120px]
            sm:w-[180px]
          "
        >
      </NuxtLink>
    </header>
    <main class="h-dvh min-h-[768px]">
      <section class="flex h-full items-center justify-center">
        <div class="space-y-6 rounded-lg border p-6">
          <img src="/logo_primary.svg" width="180">
          <Button as-child>
            <a href="/api/auth/google">
              Continue with Google
            </a>
          </Button>
        </div>
      </section>
    </main>
  </div>
</template>
