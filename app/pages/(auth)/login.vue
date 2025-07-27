<script setup lang="ts">

</script>

<template>
  <main class="h-screen min-h-[768px]">
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
</template>
