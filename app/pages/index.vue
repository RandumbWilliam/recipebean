<script setup lang="ts">
import { Star } from '@lucide/vue'

const INFOS = [
  {
    title: 'One tidy library',
    description: 'All your recipes in a single, searchable place — no more screenshots and scattered links.',
  },
  {
    title: 'Cook-ready steps',
    description: 'Jot the tweaks that made it perfect, so next time turns out even better.',
  },
  {
    title: 'Notes that stick',
    description: 'Big, glanceable ingredients and steps designed to read from across the counter.',
  },
]
</script>

<template>
  <div>
    <Header />

    <section class="container grid grid-cols-2 pt-16 pb-15 gap-8">
      <div class="flex flex-col gap-6">
        <div class="bg-accent flex items-center rounded-full px-4 h-8 gap-3 w-fit">
          <div class="w-[7px] h-[7px] rounded-full bg-primary" />
          <p class="text-primary font-bold text-sm">
            Your kitchen, beautifully organized
          </p>
        </div>
        <h1 class="font-serif font-medium text-[62px] -tracking-[0.015em] leading-[1.04]">
          Every recipe you love,<br><span class="text-primary italic">finally</span> in one cozy place.
        </h1>
        <p class="text-lg text-muted-foreground">
          Save the dishes worth making again. Keep ingredients, steps, and notes tidy — and pull them up the moment you're standing at the stove.
        </p>
        <div>
          <Button size="lg">
            Start your cookbook
          </Button>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center">
            <Star v-for="index in 5" :key="index" class="fill-primary stroke-none" :size="18" />
          </div>
          <p class="text-xs">
            Loved by home cooks keeping family recipes alive.
          </p>
        </div>
      </div>

      <div class="relative flex justify-center items-center">
        <div
          class="absolute w-[400px] h-[380px]
         bg-[linear-gradient(140deg,rgb(255,228,215)_0%,rgb(255,219,225)_100%)]
         rounded-[64%_36%_53%_47%/42%_58%]
         rotate-[-6deg]"
        />
        <img src="/hero.svg" class="w-[396px] max-w-full relative animate-rbfloat">
      </div>
    </section>

    <section class="container grid grid-cols-3 gap-4 pb-15">
      <div v-for="(info, index) in INFOS" :key="index" class="border p-6 rounded-xl flex flex-col gap-1.5 bg-white">
        <div class="flex items-center justify-center bg-accent h-10 w-10 rounded-md">
          I
        </div>
        <p class="font-bold">
          {{ info.title }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ info.description }}
        </p>
      </div>
    </section>
  </div>
</template>
