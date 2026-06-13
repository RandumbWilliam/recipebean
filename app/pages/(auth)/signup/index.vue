<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'
import GoogleButton from '@/components/auth/GoogleButton.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

definePageMeta({ layout: false })

const { isLoaded, signUp } = useSignUp()

const { r$ } = useRegleSchema({
  email: '',
  password: '',
}, z.object({
  email: z.email(),
  password: z.string().min(1, { error: 'Required' }),
}))

const error = ref('')
const loading = ref(false)
const oauthLoading = ref(false)

async function onSubmit() {
  const { valid, data } = await r$.$validate()

  if (!isLoaded.value || !signUp.value)
    return

  if (valid && !loading.value) {
    try {
      error.value = ''
      loading.value = true

      await signUp.value.create({
        emailAddress: data.email,
        password: data.password,
      })
      await signUp.value.prepareEmailAddressVerification({ strategy: 'email_code' })
      return navigateTo('/signup/verify')
    }
    catch (err: any) {
      error.value
        = err?.errors?.[0]?.longMessage
          ?? err?.errors?.[0]?.message
          ?? 'Could not create your account. Please try again.'
    }
    finally {
      loading.value = false
    }
  }
}

async function onGoogle() {
  if (!isLoaded.value || !signUp.value)
    return
  oauthLoading.value = true
  try {
    await signUp.value.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    })
  }
  catch (err: any) {
    oauthLoading.value = false
    error.value
      = err?.errors?.[0]?.longMessage
        ?? err?.errors?.[0]?.message
        ?? 'Could not start Google sign up.'
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
        <div class="w-full max-w-sm flex flex-col gap-6">
          <div v-if="error" class="border rounded-md  py-3 px-4 text-destructive bg-destructive/5 font-medium border-destructive">
            {{ error }}
          </div>

          <div>
            <h1 class="font-serif text-4xl font-medium">
              Start your <span class="text-primary italic">cookbook</span>.
            </h1>
            <p class="text-muted-foreground">
              Save the recipes worth making again.
            </p>
          </div>

          <GoogleButton :disabled="oauthLoading || loading" label="Sign up with Google" @click="onGoogle" />

          <div class="flex items-center gap-3">
            <div class="h-px flex-1 bg-border" />
            <span class="text-xs text-muted-foreground uppercase tracking-wider">
              or continue with email
            </span>
            <div class="h-px flex-1 bg-border" />
          </div>

          <form id="login-form" @submit.prevent="onSubmit">
            <FieldSet>
              <FieldGroup>
                <Field :data-invalid="r$.email.$error" class="gap-1">
                  <FieldLabel for="login-form-email">
                    Email
                  </FieldLabel>
                  <Input
                    id="login-form-email"
                    v-model="r$.$value.email"
                    type="email"
                    class="bg-white"
                    :aria-invalid="r$.email.$error"
                  />
                </Field>
                <Field :data-invalid="r$.password.$error" class="gap-1">
                  <div class="flex items-center justify-between">
                    <FieldLabel for="login-form-password">
                      Password
                    </FieldLabel>
                    <button class="font-bold text-sm text-primary">
                      Forgot?
                    </button>
                  </div>
                  <Input
                    id="login-form-password"
                    v-model="r$.$value.password"
                    type="password"
                    class="bg-white"
                    :aria-invalid="r$.password.$error"
                  />
                  <FieldDescription class="text-xs">
                    At least 8 characters.
                  </FieldDescription>
                </Field>
                <div class="flex flex-col gap-3 w-full">
                  <Button type="submit" form="login-form" size="lg" :disabled="loading || oauthLoading || !isLoaded">
                    {{ loading ? "Creating account…" : "Create account" }}
                  </Button>
                  <p class="text-center text-xs text-muted-foreground">
                    By continuing you agree to our <span class="font-bold">Terms</span> & <span class="font-bold">Privacy Policy</span>.
                  </p>
                </div>
              </FieldGroup>
            </FieldSet>
          </form>

          <div class="flex items-center gap-1.5 text-sm font-semibold">
            <p class="text-muted-foreground">
              Already have an account?
            </p><NuxtLink to="/login" class="text-primary">
              Sign in
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <AuthShell>
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
  </AuthShell> -->
</template>
