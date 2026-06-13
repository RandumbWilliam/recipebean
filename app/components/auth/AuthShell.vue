<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-screen grid md:grid-cols-2">
    <div class="flex flex-col px-6 py-8 md:px-12 md:py-10">
      <Logo class="h-7" />

      <div class="flex-1 flex items-center justify-center py-10">
        <div class="w-full max-w-sm flex flex-col gap-6">
          <div v-if="title || subtitle || $slots.heading" class="flex flex-col gap-2">
            <slot name="heading">
              <h1 class="font-serif font-medium text-4xl -tracking-[0.015em] leading-[1.1]">
                {{ title }}
              </h1>
              <p v-if="subtitle" class="text-muted-foreground">
                {{ subtitle }}
              </p>
            </slot>
          </div>

          <slot />

          <div v-if="$slots.footer" class="text-sm text-muted-foreground text-center">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex relative items-center justify-center overflow-hidden bg-accent/40">
      <div
        class="absolute w-[420px] h-[400px]
          bg-[linear-gradient(140deg,rgb(255,228,215)_0%,rgb(255,219,225)_100%)]
          rounded-[64%_36%_53%_47%/42%_58%]
          rotate-[-6deg]"
      />
      <img src="/hero.svg" class="w-[400px] max-w-full relative animate-rbfloat">
    </div>
  </div>
</template>
