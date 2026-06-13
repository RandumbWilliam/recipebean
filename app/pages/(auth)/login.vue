<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'
import GoogleButton from '@/components/auth/GoogleButton.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

definePageMeta({ layout: false })

const { isLoaded, signIn, setActive } = useSignIn()

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

  if (!isLoaded.value || !signIn.value)
    return

  if (valid && !loading.value) {
    try {
      error.value = ''
      loading.value = true

      const result = await signIn.value.create({
        identifier: data.email,
        password: data.password,
      })

      if (result.status === 'complete') {
        await setActive.value!({ session: result.createdSessionId })
        return navigateTo('/')
      }

      error.value = 'Additional verification is required to sign in.'
    }
    catch (err: any) {
      error.value
        = err?.errors?.[0]?.longMessage
          ?? err?.errors?.[0]?.message
          ?? 'Sign in failed. Please try again.'
    }
    finally {
      loading.value = false
    }
  }
}

async function onGoogle() {
  if (!isLoaded.value || !signIn.value)
    return
  oauthLoading.value = true
  try {
    await signIn.value.authenticateWithRedirect({
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
        ?? 'Could not start Google sign in.'
  }
}
</script>

<template>
  <section class="grid grid-rows-1 min-h-[768px] min-h-screen grid-cols-[1fr_min(50%,640px)] max-md:grid-cols-1">
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
              Welcome <span class="text-primary italic">back</span>.
            </h1>
            <p class="text-muted-foreground">
              Sign in to your cookbook.
            </p>
          </div>

          <GoogleButton :disabled="oauthLoading || loading" @click="onGoogle" />

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
                </Field>
                <Button type="submit" form="login-form" size="lg" :disabled="loading || oauthLoading || !isLoaded">
                  {{ loading ? "Signing in…" : "Sign in" }}
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>

          <div class="flex items-center gap-1.5 text-sm font-semibold">
            <p class="text-muted-foreground">
              New to recipebean?
            </p><NuxtLink to="/signup" class="text-primary">
              Create an account
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="relative border-l overflow-hidden h-full min-h-[240px]">
      <img src="/brunch-menu-foxes-love-lemons.jpg" class="absolute inset-0 object-cover w-full h-full">
      <div
        class="absolute inset-0 pointer-events-none bg-[linear-gradient(165deg,rgba(255,89,109,0.2)_0%,rgba(43,36,34,0.1)_45%,rgba(43,36,34,0.52)_100%)]"
      />
    </div>
  </section>
  <!-- <AuthShell subtitle="Sign in to pull up your saved recipes.">
    <template #heading>
      <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
        Welcome <span class="text-primary italic">back</span>.
      </h1>
      <p class="text-muted-foreground">
        Sign in to pull up your saved recipes.
      </p>
    </template>

    <GoogleButton :disabled="oauthLoading || loading" @click="onGoogle" />

    <div class="flex items-center gap-3">
      <div class="h-px flex-1 bg-border" />
      <span class="text-xs text-muted-foreground uppercase tracking-wider">
        or continue with email
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
          autocomplete="current-password"
          required
          :disabled="loading || oauthLoading"
          placeholder="••••••••"
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
        {{ loading ? "Signing in…" : "Sign in" }}
      </Button>
    </form>

    <template #footer>
      New to RecipeBean?
      <NuxtLink to="/signup" class="text-foreground font-medium underline-offset-4 hover:underline">
        Create an account
      </NuxtLink>
    </template>
  </AuthShell> -->
</template>
