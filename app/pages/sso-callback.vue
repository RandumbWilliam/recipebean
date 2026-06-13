<script setup lang="ts">
import AuthShell from "@/components/auth/AuthShell.vue"

definePageMeta({ layout: false })

const clerk = useClerk()

onMounted(() => {
  if (!clerk.value) return
  clerk.value.handleRedirectCallback({
    signInFallbackRedirectUrl: "/",
    signUpFallbackRedirectUrl: "/",
  })
})
</script>

<template>
  <AuthShell>
    <template #heading>
      <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
        Signing you <span class="text-primary italic">in</span>…
      </h1>
      <p class="text-muted-foreground">
        Hang tight — we're finishing up your sign in.
      </p>
    </template>

    <div class="flex justify-center py-4">
      <div class="h-8 w-8 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  </AuthShell>
</template>
