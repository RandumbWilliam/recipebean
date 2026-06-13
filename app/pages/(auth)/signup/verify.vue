<script setup lang="ts">
import AuthShell from "@/components/auth/AuthShell.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

definePageMeta({ layout: false })

const { isLoaded, signUp, setActive } = useSignUp()

const code = ref("")
const error = ref("")
const info = ref("")
const loading = ref(false)
const resending = ref(false)

onMounted(async () => {
  if (!isLoaded.value) return
  // If there is no pending sign-up, bounce back to /signup.
  if (!signUp.value || signUp.value.status === null) {
    await navigateTo("/signup")
  }
})

async function onSubmit() {
  if (!isLoaded.value || !signUp.value) return
  error.value = ""
  info.value = ""
  loading.value = true
  try {
    const result = await signUp.value.attemptEmailAddressVerification({ code: code.value })
    if (result.status === "complete") {
      await setActive.value!({ session: result.createdSessionId })
      await navigateTo("/")
      return
    }
    error.value = "Verification incomplete. Please try again."
  }
  catch (err: any) {
    error.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? "Invalid code. Please try again."
  }
  finally {
    loading.value = false
  }
}

async function onResend() {
  if (!isLoaded.value || !signUp.value) return
  error.value = ""
  info.value = ""
  resending.value = true
  try {
    await signUp.value.prepareEmailAddressVerification({ strategy: "email_code" })
    info.value = "We sent a new code to your inbox."
  }
  catch (err: any) {
    error.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? "Could not resend code."
  }
  finally {
    resending.value = false
  }
}
</script>

<template>
  <AuthShell>
    <template #heading>
      <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
        Check your <span class="text-primary italic">inbox</span>.
      </h1>
      <p class="text-muted-foreground">
        Enter the 6-digit code we sent to confirm your email.
      </p>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2">
        <Label for="code">Verification code</Label>
        <Input
          id="code"
          v-model="code"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="6"
          required
          :disabled="loading"
          placeholder="123456"
          class="text-center tracking-[0.5em] text-lg"
        />
      </div>

      <p v-if="info" class="text-sm text-muted-foreground">
        {{ info }}
      </p>
      <p v-if="error" class="text-sm text-destructive">
        {{ error }}
      </p>

      <Button
        type="submit"
        size="lg"
        class="w-full"
        :disabled="loading || !isLoaded || code.length === 0"
      >
        {{ loading ? "Verifying…" : "Verify email" }}
      </Button>

      <button
        type="button"
        class="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
        :disabled="resending"
        @click="onResend"
      >
        {{ resending ? "Sending…" : "Resend code" }}
      </button>
    </form>

    <template #footer>
      Wrong email?
      <NuxtLink to="/signup" class="text-foreground font-medium underline-offset-4 hover:underline">
        Start over
      </NuxtLink>
    </template>
  </AuthShell>
</template>
