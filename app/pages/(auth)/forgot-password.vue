<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'
import PasswordInput from '~/components/auth/PasswordInput.vue'
import { cn } from '~/lib/utils'

definePageMeta({ layout: false })

const { isLoaded, signIn, setActive } = useSignIn()

// Clerk's reset flow is a sign-in: `create` with the reset strategy mails a
// code, and `attemptFirstFactor` with that code and the new password both
// changes the password and signs the user in.
const step = ref<'email' | 'reset'>('email')

const { r$: email$ } = useRegleSchema({
  email: '',
}, z.object({
  email: z.email(),
}), {
  autoDirty: false,
})

const { r$: reset$ } = useRegleSchema({
  code: '',
  password: '',
}, z.object({
  code: z.string().length(6, { error: 'Enter all 6 digits' }),
  // Matches the sign-up form's rule.
  password: z.string().min(8, { error: 'Minimum 8 characters' }),
}), {
  autoDirty: false,
})

const errorMessage = ref('')
const info = ref('')
const loading = ref(false)
const resending = ref(false)
const { remaining: resendCooldown, start: startResendCooldown } = useResendCooldown()

async function sendCode(email: string) {
  await signIn.value!.create({
    strategy: 'reset_password_email_code',
    identifier: email,
  })
  startResendCooldown()
}

async function onSendCode() {
  if (!isLoaded.value || !signIn.value)
    return

  const { valid, data } = await email$.$validate()

  if (!valid || loading.value)
    return

  errorMessage.value = ''
  loading.value = true

  try {
    await sendCode(data.email)
    step.value = 'reset'
  }
  catch (err: any) {
    errorMessage.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Could not send a reset code. Please try again.'
  }
  finally {
    loading.value = false
  }
}

async function onReset() {
  if (!isLoaded.value || !signIn.value || !setActive.value)
    return

  const { valid, data } = await reset$.$validate()

  if (!valid || loading.value)
    return

  errorMessage.value = ''
  info.value = ''
  loading.value = true

  try {
    const attempt = await signIn.value.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code: data.code,
      password: data.password,
    })

    if (attempt.status === 'complete') {
      await setActive.value({ session: attempt.createdSessionId })
      await navigateTo(DEFAULT_REDIRECT)
      return
    }

    // The password is changed, but the account still wants a second step.
    // The login page knows how to ask for it.
    console.warn('Unhandled sign-in status after reset', attempt.status)
    await navigateTo('/login')
  }
  catch (err: any) {
    errorMessage.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Could not reset your password. Please try again.'
  }
  finally {
    loading.value = false
  }
}

async function onResend() {
  if (!isLoaded.value || !signIn.value || resending.value || resendCooldown.value > 0)
    return

  errorMessage.value = ''
  info.value = ''
  resending.value = true

  try {
    await sendCode(email$.$value.email)
    info.value = 'We sent a new code to your inbox.'
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

function backToEmail() {
  step.value = 'email'
  reset$.$reset({ toInitialState: true })
  errorMessage.value = ''
  info.value = ''
}
</script>

<template>
  <section class="grid grid-rows-1 max-md:grid-cols-1 min-h-[768px] min-h-screen md:grid-cols-[1fr_min(50%,640px)]">
    <div
      :class="cn(
        'flex flex-col gap-6 px-4 py-4',
        'md:px-8 md:py-8',
        'lg:px-14 lg:py-11',
      )"
    >
      <NuxtLink to="/" class="w-fit">
        <Logo class="h-7" />
      </NuxtLink>

      <div class="flex-1 flex items-start md:items-center">
        <div class="w-full max-w-md mx-auto flex flex-col gap-6 md:mx-0">
          <div v-if="info" class="border rounded-md text-sm py-3 px-4 font-medium text-muted-foreground bg-muted">
            {{ info }}
          </div>
          <div v-if="errorMessage" class="border rounded-md text-sm py-3 px-4 text-destructive bg-destructive/5 font-medium border-destructive">
            {{ errorMessage }}
          </div>

          <template v-if="step === 'email'">
            <div>
              <h1 class="font-serif text-4xl font-medium">
                Forgot your <span class="text-primary italic">password</span>?
              </h1>
              <p class="text-muted-foreground">
                Enter your email and we’ll send you a code to reset it.
              </p>
            </div>

            <form id="forgot-form" @submit.prevent="onSendCode">
              <FieldSet :disabled="loading">
                <FieldGroup>
                  <Field :data-invalid="email$.email.$error" class="gap-1">
                    <FieldLabel for="forgot-form-email">
                      Email
                    </FieldLabel>
                    <Input
                      id="forgot-form-email"
                      v-model="email$.$value.email"
                      type="email"
                      autocomplete="email"
                      class="bg-white"
                      :aria-invalid="email$.email.$error"
                      @input="errorMessage = ''"
                    />
                  </Field>
                  <Button type="submit" form="forgot-form" size="lg" :disabled="loading || !isLoaded">
                    {{ loading ? "Sending…" : "Send reset code" }}
                  </Button>
                </FieldGroup>
              </FieldSet>
            </form>
          </template>

          <template v-else>
            <div>
              <h1 class="font-serif text-4xl font-medium">
                Check your <span class="text-primary italic">inbox</span>.
              </h1>
              <p class="text-muted-foreground">
                Enter the 6-digit code we sent to
                <span class="font-medium text-foreground">{{ email$.$value.email }}</span>
                and choose a new password.
              </p>
            </div>

            <form id="reset-form" @submit.prevent="onReset">
              <FieldSet :disabled="loading">
                <FieldGroup>
                  <Field :data-invalid="reset$.code.$error" class="gap-1">
                    <FieldLabel for="reset-form-code">
                      Code
                    </FieldLabel>
                    <Input
                      id="reset-form-code"
                      v-model="reset$.$value.code"
                      inputmode="numeric"
                      autocomplete="one-time-code"
                      maxlength="6"
                      placeholder="123456"
                      :aria-invalid="reset$.code.$error"
                      class="bg-white text-center tracking-[0.5em] text-lg"
                      @input="errorMessage = ''"
                    />
                  </Field>
                  <Field :data-invalid="reset$.password.$error" class="gap-1">
                    <FieldLabel for="reset-form-password">
                      New password
                    </FieldLabel>
                    <PasswordInput
                      id="reset-form-password"
                      v-model="reset$.$value.password"
                      autocomplete="new-password"
                      class="bg-white"
                      :aria-invalid="reset$.password.$error"
                      @input="errorMessage = ''"
                    />
                    <FieldDescription class="text-xs">
                      At least 8 characters.
                    </FieldDescription>
                  </Field>
                  <Button type="submit" form="reset-form" size="lg" :disabled="loading || !isLoaded">
                    {{ loading ? "Resetting…" : "Reset password" }}
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
              Wrong email? <button type="button" class="text-primary font-bold" @click="backToEmail">
                Start over
              </button>
            </div>
          </template>

          <div class="text-sm text-muted-foreground font-semibold">
            Remembered it? <NuxtLink to="/login" class="text-primary font-bold">
              Back to sign in
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex relative border-l overflow-hidden h-full min-h-[240px]">
      <img src="/brunch-menu-foxes-love-lemons.jpg" class="absolute inset-0 object-cover w-full h-full">
      <div
        class="absolute inset-0 pointer-events-none bg-[linear-gradient(165deg,rgba(255,89,109,0.2)_0%,rgba(43,36,34,0.1)_45%,rgba(43,36,34,0.52)_100%)]"
      />
    </div>
  </section>
</template>
