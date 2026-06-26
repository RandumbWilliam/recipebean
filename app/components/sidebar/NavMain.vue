<script setup lang="ts">
import { BookOpenText, Clock, CookingPot, Heart } from '@lucide/vue'

const NAV_MENU = [
  {
    title: 'All recipes',
    icon: BookOpenText,
    url: '/dashboard',
  },
  {
    title: 'Favorites',
    icon: Heart,
    url: '/dashboard/favorites',
  },
  {
    title: 'Collections',
    icon: CookingPot,
    url: '#',
  },
  {
    title: 'Recently added',
    icon: Clock,
    url: '#',
  },
]
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in NAV_MENU" :key="item.title">
          <SidebarMenuButton as-child :tooltip="item.title">
            <NuxtLink
              :to="item.url"
              class="text-muted-foreground h-10 px-3 hover:bg-accent! hover:text-muted-foreground! font-semibold"
              active-class="bg-primary text-primary-foreground hover:bg-primary! hover:text-primary-foreground!"
            >
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
