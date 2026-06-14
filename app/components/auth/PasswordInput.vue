<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue'

defineOptions({ inheritAttrs: false })

const showPassword = ref(false)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative flex items-center justify-end">
    <Input v-bind="$attrs" :type="showPassword ? 'text' : 'password'" class="pr-8" />
    <div class="flex items-center absolute px-2">
      <button type="button" class="text-muted-foreground" @click="toggleShowPassword">
        <EyeOff v-if="showPassword" :size="20" />
        <Eye v-else :size="20" />
      </button>
    </div>
  </div>
</template>
