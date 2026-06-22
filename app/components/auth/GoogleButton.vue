<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Google from '../icons/Google.vue'

interface Props {
  disabled?: boolean
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Continue with Google',
})

defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <Button
    type="button"
    variant="outline"
    size="lg"
    class="w-full bg-white"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <Google class="size-4" />
    <span>{{ label }}</span>
  </Button>
</template>
