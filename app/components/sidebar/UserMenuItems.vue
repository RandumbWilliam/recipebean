<script setup lang="ts">
import type { CurrentUser } from '~/composables/useCurrentUser'
import { BadgeCheck, LogOut } from '@lucide/vue'
import UserAvatar from './UserAvatar.vue'

// The body of the user dropdown, shared by the sidebar footer (desktop) and
// the top bar avatar (mobile). Each caller supplies its own
// DropdownMenuContent, since they anchor to different sides.
const props = defineProps<{
  user: CurrentUser
}>()

const clerk = useClerk()

// On mobile the menu is tapped, not clicked, so each row grows to a 44px touch
// target. Desktop keeps the compact sidebar sizing.
const itemClass = 'max-md:min-h-11 max-md:gap-3 max-md:px-3 max-md:text-base max-md:[&_svg:not([class*=size-])]:size-5'

const fullName = computed(() =>
  [props.user.firstName, props.user.lastName].filter(Boolean).join(' '),
)

const recipeCountLabel = computed(() =>
  `${props.user.recipeCount} ${props.user.recipeCount === 1 ? 'recipe' : 'recipes'}`,
)

async function signOut() {
  await clerk.value?.signOut({ redirectUrl: '/login' })
}
</script>

<template>
  <DropdownMenuLabel class="p-0 font-normal">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm max-md:gap-3 max-md:px-2 max-md:py-2">
      <UserAvatar :user class="h-9 w-9 rounded-full" />
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-bold">{{ fullName }}</span>
        <span class="truncate text-xs text-muted-foreground">{{ recipeCountLabel }}</span>
      </div>
    </div>
  </DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuItem :class="itemClass" as-child>
    <NuxtLink to="/dashboard/account">
      <BadgeCheck />
      Account
    </NuxtLink>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem :class="itemClass" @select="signOut">
    <LogOut />
    Log out
  </DropdownMenuItem>
</template>
