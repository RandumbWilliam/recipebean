<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { LoaderCircle } from 'lucide-vue-next'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <div v-if="loading" class="absolute">
      <LoaderCircle class="h-6 w-6 animate-spin text-inherit" />
    </div>
    <span
      :class="
        cn({
          'opacity-100': !props.loading,
          'opacity-0': props.loading,
        })
      "
    >
      <slot />
    </span>
  </Primitive>
</template>
