<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      `
        flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent
        px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
        selection:bg-primary selection:text-primary-foreground
        file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm
        file:font-medium file:text-foreground
        placeholder:text-muted-foreground
        disabled:pointer-events-none disabled:cursor-not-allowed
        disabled:opacity-50
        md:text-sm
        dark:bg-input/30
      `,
      `
        focus-visible:border-ring focus-visible:ring-[3px]
        focus-visible:ring-ring/50
      `,
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
</template>
