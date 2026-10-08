<script setup lang="ts">
import type { CurrentUser } from '~/composables/useCurrentUser'
import { ChevronsUpDown } from '@lucide/vue'
import {
  useSidebar,
} from '@/components/ui/sidebar'
import UserAvatar from './UserAvatar.vue'
import UserMenuItems from './UserMenuItems.vue'

const props = defineProps<{
  user: CurrentUser
}>()

const { isMobile } = useSidebar()

const fullName = computed(() =>
  [props.user.firstName, props.user.lastName].filter(Boolean).join(' '),
)

const recipeCountLabel = computed(() =>
  `${props.user.recipeCount} ${props.user.recipeCount === 1 ? 'recipe' : 'recipes'}`,
)
</script>

<template>
  <SidebarMenu class="border bg-white rounded-lg">
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserAvatar :user class="h-9 w-9 rounded-lg" />
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-bold">{{ fullName }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ recipeCountLabel }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <UserMenuItems :user />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
