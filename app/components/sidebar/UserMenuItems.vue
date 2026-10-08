<script setup lang="ts">
import type { CurrentUser } from '~/composables/useCurrentUser'
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
} from '@lucide/vue'
import UserAvatar from './UserAvatar.vue'

// The body of the user dropdown, shared by the sidebar footer (desktop) and
// the top bar avatar (mobile). Each caller supplies its own
// DropdownMenuContent, since they anchor to different sides.
const props = defineProps<{
  user: CurrentUser
}>()

const clerk = useClerk()

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
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserAvatar :user class="h-9 w-9 rounded-full" />
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-bold">{{ fullName }}</span>
        <span class="truncate text-xs text-muted-foreground">{{ recipeCountLabel }}</span>
      </div>
    </div>
  </DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem>
      <Sparkles />
      Upgrade to Pro
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem as-child>
      <NuxtLink to="/dashboard/account">
        <BadgeCheck />
        Account
      </NuxtLink>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CreditCard />
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Bell />
      Notifications
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem @select="signOut">
    <LogOut />
    Log out
  </DropdownMenuItem>
</template>
