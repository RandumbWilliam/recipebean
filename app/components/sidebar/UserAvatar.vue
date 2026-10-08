<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CurrentUser } from '~/composables/useCurrentUser'
import { PFP } from '~~/shared/misc/pfp'

const props = defineProps<{
  user: Pick<CurrentUser, 'firstName' | 'lastName' | 'pfpId'>
  class?: HTMLAttributes['class']
}>()

const fullName = computed(() =>
  [props.user.firstName, props.user.lastName].filter(Boolean).join(' '),
)

const initials = computed(() =>
  [props.user.firstName?.[0], props.user.lastName?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || 'U',
)
</script>

<template>
  <Avatar :class="props.class">
    <AvatarImage :src="`/kawaii-icons/${PFP[user.pfpId]}`" :alt="fullName" class="bg-accent" />
    <AvatarFallback class="rounded-lg">
      {{ initials }}
    </AvatarFallback>
  </Avatar>
</template>
