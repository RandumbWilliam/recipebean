<script setup lang="ts">
definePageMeta({ layout: false })

const clerk = useClerk()

onMounted(async () => {
  try {
    await until(() => clerk.value).toBeTruthy()
    await clerk.value!.handleRedirectCallback({
      signInForceRedirectUrl: '/dashboard',
      signUpForceRedirectUrl: '/dashboard',
    })
  }
  catch (e: any) {
    await navigateTo(`/login?error=${encodeURIComponent(e?.message ?? 'sso_failed')}`)
  }
})
</script>

<template>
  <div>
    <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
      Signing you <span class="text-primary italic">in</span>…
    </h1>
    <p class="text-muted-foreground">
      Hang tight — we're finishing up your sign in.
    </p>

    <div class="flex justify-center py-4">
      <div class="h-8 w-8 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  </div>
</template>
