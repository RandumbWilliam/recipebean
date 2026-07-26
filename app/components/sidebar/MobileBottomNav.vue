<script setup lang="ts">
import type { Component } from 'vue'
import { BookOpenText, CookingPot, Heart, Plus, Search } from '@lucide/vue'
import { cn } from '~/lib/utils'

interface NavItem {
  title: string
  icon: Component
  url?: string
  action?: 'search'
}

const NAV_MENU: NavItem[] = [
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
    title: 'Search',
    icon: Search,
    action: 'search',
  },
]

const route = useRoute()
const { openSearch } = useRecipeSearch()

const leftItems = NAV_MENU.slice(0, 2)
const rightItems = NAV_MENU.slice(2)

const tabClass = 'flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-muted-foreground transition-colors'

function isActive(url: string) {
  if (url === '#')
    return false
  if (url === '/dashboard')
    return route.path === '/dashboard'
  return route.path.startsWith(url)
}
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background md:hidden pb-[env(safe-area-inset-bottom)]"
    aria-label="Main"
  >
    <div class="relative flex h-16 items-end justify-around px-1 pb-1">
      <NuxtLink
        v-for="item in leftItems"
        :key="item.title"
        :to="item.url"
        :aria-current="isActive(item.url!) ? 'page' : undefined"
        :class="cn(tabClass, isActive(item.url!) && 'text-primary')"
      >
        <component :is="item.icon" class="size-5 shrink-0" :stroke-width="isActive(item.url!) ? 2.5 : 2" />
        <span class="max-w-full truncate text-[10px] font-semibold leading-tight">
          {{ item.title }}
        </span>
      </NuxtLink>

      <div class="relative flex w-14 shrink-0 justify-center">
        <NuxtLink
          to="/dashboard/new"
          aria-label="Create new recipe"
          class="absolute bottom-2 flex size-14 -translate-y-1/3 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Plus class="size-7" :stroke-width="2.5" />
        </NuxtLink>
      </div>

      <template v-for="item in rightItems" :key="item.title">
        <button
          v-if="item.action === 'search'"
          type="button"
          :class="tabClass"
          @click="openSearch"
        >
          <component :is="item.icon" class="size-5 shrink-0" :stroke-width="2" />
          <span class="max-w-full truncate text-[10px] font-semibold leading-tight">
            {{ item.title }}
          </span>
        </button>
        <NuxtLink
          v-else
          :to="item.url"
          :aria-current="isActive(item.url!) ? 'page' : undefined"
          :class="cn(tabClass, isActive(item.url!) && 'text-primary')"
        >
          <component :is="item.icon" class="size-5 shrink-0" :stroke-width="isActive(item.url!) ? 2.5 : 2" />
          <span class="max-w-full truncate text-[10px] font-semibold leading-tight">
            {{ item.title }}
          </span>
        </NuxtLink>
      </template>
    </div>
  </nav>
</template>
