<script setup lang="ts">
import AuthShell from "@/components/auth/AuthShell.vue"
import GoogleButton from "@/components/auth/GoogleButton.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

definePageMeta({ layout: false })

const { isLoaded, signUp } = useSignUp()

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)
const oauthLoading = ref(false)

async function onSubmit() {
  if (!isLoaded.value || !signUp.value) return
  error.value = ""
  loading.value = true
  try {
    await signUp.value.create({
      emailAddress: email.value,
      password: password.value,
    })
    await signUp.value.prepareEmailAddressVerification({ strategy: "email_code" })
    await navigateTo("/signup/verify")
  }
  catch (err: any) {
    error.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? "Could not create your account. Please try again."
  }
  finally {
    loading.value = false
  }
}

async function onGoogle() {
  if (!isLoaded.value || !signUp.value) return
  oauthLoading.value = true
  try {
    await signUp.value.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }
  catch (err: any) {
    oauthLoading.value = false
    error.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? "Could not start Google sign up."
  }
}
</script>

<template>
  <AuthShell>
    <template #heading>
      <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
        Start your <span class="text-primary italic">cookbook</span>.
      </h1>
      <p class="text-muted-foreground">
        A cozy place for every recipe you love.
      </p>
    </template>

    <GoogleButton :disabled="oauthLoading || loading" @click="onGoogle" />

    <div class="flex items-center gap-3">
      <div class="h-px flex-1 bg-border" />
      <span class="text-xs text-muted-foreground uppercase tracking-wider">
        or sign up with email
      </span>
      <div class="h-px flex-1 bg-border" />
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          :disabled="loading || oauthLoading"
          placeholder="you@example.com"
        />
      </div>

      <div class="flex flex-col gap-2">
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="password"
          type="password"
          autocomplete="new-password"
          required
          :disabled="loading || oauthLoading"
          placeholder="At least 8 characters"
        />
      </div>

      <p v-if="error" class="text-sm text-destructive">
        {{ error }}
      </p>

      <Button
        type="submit"
        size="lg"
        class="w-full"
        :disabled="loading || oauthLoading || !isLoaded"
      >
        {{ loading ? "Creating account…" : "Create account" }}
      </Button>
    </form>

    <template #footer>
      Already have an account?
      <NuxtLink to="/login" class="text-foreground font-medium underline-offset-4 hover:underline">
        Sign in
      </NuxtLink>
    </template>
  </AuthShell>
</template>
