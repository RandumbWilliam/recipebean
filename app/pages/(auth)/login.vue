<script setup lang="ts">
import type { SignInResource } from '@clerk/nuxt/types'
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'
import GoogleButton from '~/components/auth/GoogleButton.vue'
import PasswordInput from '~/components/auth/PasswordInput.vue'
import { cn } from '~/lib/utils'

definePageMeta({ layout: false })

const { isLoaded, signIn, setActive } = useSignIn()
const route = useRoute()

const { r$ } = useRegleSchema({
  email: '',
  password: '',
}, z.object({
  email: z.email(),
  password: z.string().min(1, { error: 'Required' }),
}), {
  autoDirty: false,
})

const { r$: code$ } = useRegleSchema({
  code: '',
}, z.object({
  code: z.string().length(6, { error: 'Enter all 6 digits' }),
}))

// A password sign-in from a browser Clerk has not seen before (client trust),
// or from an account with email as its second factor, stops short of
// `complete` and asks for a code mailed to the account. `verify` is that step.
const step = ref<'credentials' | 'verify'>('credentials')
const sentTo = ref('')

const errorMessage = ref('')
const info = ref('')
const loading = ref(false)
const resending = ref(false)
const { remaining: resendCooldown, start: startResendCooldown } = useResendCooldown()

function redirectUrl(): string {
  return safeRedirectPath(route.query.r)
}

async function onSubmit() {
  if (!isLoaded.value || !signIn.value || !setActive.value)
    return

  const { valid, data } = await r$.$validate()

  if (!valid || loading.value)
    return

  errorMessage.value = ''
  loading.value = true

  try {
    const attempt = await signIn.value.create({
      identifier: data.email,
      password: data.password,
    })
    if (attempt.status === 'complete') {
      await finish(attempt)
      return
    }

    if (attempt.status === 'needs_client_trust' || attempt.status === 'needs_second_factor') {
      if (await sendEmailCode(attempt)) {
        step.value = 'verify'
        return
      }

      errorMessage.value = 'Your account uses a verification method we don’t support yet. Please contact support.'
      return
    }

    console.warn('Unhandled sign-in status', attempt.status)
    errorMessage.value = 'We couldn’t finish signing you in. Please try again or contact support.'
  }
  catch (err: any) {
    errorMessage.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Sign in failed. Please try again.'
  }
  finally {
    loading.value = false
  }
}

async function finish(attempt: SignInResource) {
  await setActive.value!({ session: attempt.createdSessionId })
  await navigateTo(redirectUrl())
}

/**
 * Mails the second-step code. Returns false when the account offers no email
 * code (an authenticator app or SMS only), which this page does not support.
 */
async function sendEmailCode(attempt: SignInResource): Promise<boolean> {
  const factor = attempt.supportedSecondFactors?.find(f => f.strategy === 'email_code')
  if (!factor || factor.strategy !== 'email_code')
    return false

  await attempt.prepareSecondFactor({
    strategy: 'email_code',
    emailAddressId: factor.emailAddressId,
  })
  sentTo.value = factor.safeIdentifier
  startResendCooldown()
  return true
}

async function onVerify() {
  if (!isLoaded.value || !signIn.value || !setActive.value)
    return

  const { valid, data } = await code$.$validate()

  if (!valid || loading.value)
    return

  errorMessage.value = ''
  info.value = ''
  loading.value = true

  try {
    const attempt = await signIn.value.attemptSecondFactor({
      strategy: 'email_code',
      code: data.code,
    })
    if (attempt.status === 'complete') {
      await finish(attempt)
      return
    }

    console.warn('Unhandled sign-in status', attempt.status)
    errorMessage.value = 'We couldn’t finish signing you in. Please try again or contact support.'
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
  if (!isLoaded.value || !signIn.value || resending.value || resendCooldown.value > 0)
    return

  errorMessage.value = ''
  info.value = ''
  resending.value = true

  try {
    await sendEmailCode(signIn.value)
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

function backToCredentials() {
  step.value = 'credentials'
  code$.$reset({ toInitialState: true })
  errorMessage.value = ''
  info.value = ''
}

async function onGoogle() {
  if (!isLoaded.value || !signIn.value || loading.value)
    return

  errorMessage.value = ''
  loading.value = true

  try {
    // The `?r=` destination has to survive the round trip to Google, and the
    // callback URL is the one thing Clerk sends the user back to verbatim — so
    // it rides along there rather than in `redirectUrlComplete` alone.
    const target = redirectUrl()

    await signIn.value.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: `/sso-callback?r=${encodeURIComponent(target)}`,
      redirectUrlComplete: target,
    })

    // `loading` deliberately stays set. This resolves once the redirect is
    // under way, not once the browser has left, so clearing it here flashes the
    // form back to enabled for a frame before the page goes.
  }
  catch (err: any) {
    errorMessage.value = err?.errors?.[0]?.longMessage
      ?? err?.errors?.[0]?.message
      ?? 'Could not start Google sign in.'
    loading.value = false
  }
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

          <template v-if="step === 'verify'">
            <div>
              <h1 class="font-serif text-4xl font-medium">
                Check your <span class="text-primary italic">inbox</span>.
              </h1>
              <p class="text-muted-foreground">
                To confirm it’s you, enter the 6-digit code we sent to
                <span v-if="sentTo" class="font-medium text-foreground">{{ sentTo }}</span>
                <span v-else>your email</span>.
              </p>
            </div>

            <form id="login-verify-form" @submit.prevent="onVerify">
              <FieldSet :disabled="loading">
                <FieldGroup>
                  <Field :data-invalid="code$.code.$error" class="gap-1">
                    <FieldLabel for="login-verify-form-code">
                      Code
                    </FieldLabel>
                    <Input
                      id="login-verify-form-code"
                      v-model="code$.$value.code"
                      inputmode="numeric"
                      autocomplete="one-time-code"
                      maxlength="6"
                      placeholder="123456"
                      :aria-invalid="code$.code.$error"
                      class="bg-white text-center tracking-[0.5em] text-lg"
                      @input="errorMessage = ''"
                    />
                  </Field>
                  <Button type="submit" form="login-verify-form" size="lg" :disabled="loading || !isLoaded || code$.$value.code.length !== 6">
                    {{ loading ? "Verifying…" : "Verify and sign in" }}
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
              Not you? <button type="button" class="text-primary font-bold" @click="backToCredentials">
                Use a different account
              </button>
            </div>
          </template>

          <template v-else>
            <div>
              <h1 class="font-serif text-4xl font-medium">
                Welcome <span class="text-primary italic">back</span>.
              </h1>
              <p class="text-muted-foreground">
                Sign in to your cookbook.
              </p>
            </div>

            <GoogleButton :disabled="loading || !isLoaded" @click="onGoogle" />

            <div class="flex items-center gap-3">
              <div class="h-px flex-1 bg-border" />
              <span class="text-xs text-muted-foreground uppercase tracking-wider">
                or continue with email
              </span>
              <div class="h-px flex-1 bg-border" />
            </div>

            <form id="login-form" @submit.prevent="onSubmit">
              <FieldSet :disabled="loading">
                <FieldGroup>
                  <Field :data-invalid="r$.email.$error" class="gap-1">
                    <FieldLabel for="login-form-email">
                      Email
                    </FieldLabel>
                    <Input
                      id="login-form-email"
                      v-model="r$.$value.email"
                      type="email"
                      autocomplete="email"
                      class="bg-white"
                      :aria-invalid="r$.email.$error"
                      @input="errorMessage = ''"
                    />
                  </Field>
                  <Field :data-invalid="r$.password.$error" class="gap-1">
                    <div class="flex items-center justify-between">
                      <FieldLabel for="login-form-password">
                        Password
                      </FieldLabel>
                      <NuxtLink to="/forgot-password" class="font-bold text-sm text-primary">
                        Forgot?
                      </NuxtLink>
                    </div>
                    <PasswordInput
                      id="login-form-password"
                      v-model="r$.$value.password"
                      type="password"
                      autocomplete="current-password"
                      class="bg-white"
                      :aria-invalid="r$.password.$error"
                      @input="errorMessage = ''"
                    />
                  </Field>
                  <Button type="submit" form="login-form" size="lg" :disabled="loading || !isLoaded">
                    {{ loading ? "Signing in…" : "Sign in" }}
                  </Button>
                </FieldGroup>
              </FieldSet>
            </form>

            <div class="text-sm text-muted-foreground font-semibold">
              New to recipebean? <NuxtLink to="/sign-up" class="text-primary font-bold">
                Create an account
              </NuxtLink>
            </div>
          </template>
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
