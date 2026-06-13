<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const modelValue = defineModel<string | number>()
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition-colors',
      'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      props.class,
    )"
  >
</template>
