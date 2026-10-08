<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
import UserMenuItems from './UserMenuItems.vue'

// On mobile the sidebar is never shown, so its footer menu is out of reach.
// This bar carries the logo and an avatar that opens the same menu.
const currentUser = useCurrentUser()
</script>

<template>
  <header
    class="border-b border-border bg-background px-6 pt-[env(safe-area-inset-top)] md:hidden"
  >
    <div class="flex h-14 w-full items-center justify-between">
      <NuxtLink to="/dashboard" aria-label="All recipes">
        <Logo class="h-6" />
      </NuxtLink>

      <DropdownMenu v-if="currentUser">
        <DropdownMenuTrigger
          aria-label="Open account menu"
          class="-mr-1.5 flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <UserAvatar :user="currentUser" class="size-9 border border-border" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56 rounded-lg" align="end">
          <UserMenuItems :user="currentUser" />
        </DropdownMenuContent>
      </DropdownMenu>
      <Skeleton v-else class="size-9 rounded-full" />
    </div>
  </header>
</template>
