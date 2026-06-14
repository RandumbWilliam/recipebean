<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'

definePageMeta({
  layout: false,
  middleware: async () => {
    const { isLoaded, signUp, setActive } = useSignUp()

    try {
      await until(isLoaded).toBe(true, { timeout: 5000, throwOnTimeout: true })
    }
    catch {
      return navigateTo('/sign-up')
    }

    const status = signUp.value?.status
    const hasPendingEmail = !!signUp.value?.emailAddress

    if (!status || !setActive.value || !hasPendingEmail || status === 'abandoned') {
      return navigateTo('/sign-up')
    }

    if (status === 'complete' && signUp.value.createdSessionId) {
      await setActive.value({ session: signUp.value.createdSessionId })
      return navigateTo('/dashboard')
    }
  },
})

const { isLoaded, signUp, setActive } = useSignUp()

const { r$ } = useRegleSchema({
  code: '',
}, z.object({
  code: z.string().length(6, { error: 'Enter all 6 digits' }),
}))

const errorMessage = ref('')
const info = ref('')
const loading = ref(false)
const resending = ref(false)
const resendCooldown = ref(0)
let resendTimer: ReturnType<typeof setInterval> | null = null

const sentToEmail = computed(() => signUp.value?.emailAddress ?? '')

function startResendCooldown() {
  resendCooldown.value = 30
  if (resendTimer)
    clearInterval(resendTimer)
  resendTimer = setInterval(() => {
    resendCooldown.value -= 1
    if (resendCooldown.value <= 0 && resendTimer) {
      clearInterval(resendTimer)
      resendTimer = null
    }
  }, 1000)
}

onBeforeUnmount(() => {
  if (resendTimer)
    clearInterval(resendTimer)
})

async function onSubmit() {
  if (!isLoaded.value || !signUp.value || !setActive.value)
    return

  const { valid, data } = await r$.$validate()

  if (!valid || loading.value)
    return

  errorMessage.value = ''
  info.value = ''
  loading.value = true

  try {
    const result = await signUp.value.attemptEmailAddressVerification({ code: data.code })

    if (result.status === 'complete') {
      await setActive.value({ session: result.createdSessionId })
      await navigateTo('/dashboard')
      return
    }

    errorMessage.value = 'Verification incomplete. Please try again.'
  }
  catch (err: any) {
    errorMessage.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Invalid code. Please try again.'
  }
  finally {
    loading.value = false
  }
}

async function onResend() {
  if (!isLoaded.value || !signUp.value || resending.value || resendCooldown.value > 0)
    return
  errorMessage.value = ''
  info.value = ''
  resending.value = true
  try {
    await signUp.value.prepareEmailAddressVerification({ strategy: 'email_code' })
    info.value = 'We sent a new code to your inbox.'
    startResendCooldown()
  }
  catch (err: any) {
    errorMessage.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Could not resend code.'
  }
  finally {
    resending.value = false
  }
}
</script>

<template>
  <section class="grid grid-rows-1 min-h-[768px] min-h-screen grid-cols-[min(50%,640px)_1fr] max-md:grid-cols-1">
    <div class="relative border-l overflow-hidden h-full min-h-[240px]">
      <img src="/chicken-pasta-foxes-love-lemons.jpg" class="absolute inset-0 object-cover w-full h-full">
      <div
        class="absolute inset-0 pointer-events-none bg-[linear-gradient(165deg,rgba(255,89,109,0.2)_0%,rgba(43,36,34,0.1)_45%,rgba(43,36,34,0.52)_100%)]"
      />
    </div>

    <div class="flex flex-col gap-6 px-14 py-11">
      <div class="w-fit">
        <Logo class="h-7" />
      </div>

      <div class="flex-1 flex items-center">
        <div class="w-full max-w-md flex flex-col gap-6">
          <div v-if="info" class="border rounded-md  py-3 px-4 font-medium text-muted-foreground bg-muted">
            {{ info }}
          </div>
          <div v-if="errorMessage" class="border rounded-md  py-3 px-4 text-destructive bg-destructive/5 font-medium border-destructive">
            {{ errorMessage }}
          </div>

          <div>
            <h1 class="font-serif text-4xl font-medium">
              Check your <span class="text-primary italic">inbox</span>.
            </h1>
            <p class="text-muted-foreground">
              Enter the 6-digit code we sent to
              <span v-if="sentToEmail" class="font-medium text-foreground">{{ sentToEmail }}</span>
              <span v-else>your email</span>
              to confirm your account.
            </p>
          </div>

          <form id="verify-form" @submit.prevent="onSubmit">
            <FieldSet :disabled="loading">
              <FieldGroup>
                <Field :data-invalid="r$.code.$error" class="gap-1">
                  <FieldLabel for="verify-form-code">
                    Code
                  </FieldLabel>
                  <Input
                    id="verify-form-code"
                    v-model="r$.$value.code"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="6"
                    placeholder="123456"
                    :aria-invalid="r$.code.$error"
                    class="bg-white text-center tracking-[0.5em] text-lg"
                  />
                </Field>
                <Button type="submit" form="verify-form" size="lg" :disabled="loading || !isLoaded || r$.$value.code.length !== 6">
                  {{ loading ? "Verifying…" : "Verify email" }}
                </Button>
                <button
                  type="button"
                  class="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="resending || resendCooldown > 0"
                  @click="onResend"
                >
                  {{
                    resending ? "Sending…"
                    : resendCooldown > 0 ? `Resend code in ${resendCooldown}s`
                      : "Resend code"
                  }}
                </button>
              </FieldGroup>
            </FieldSet>
          </form>

          <div class="text-sm text-muted-foreground font-semibold">
            Wrong email? <NuxtLink to="/sign-up" class="text-primary font-bold">
              Start over
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
