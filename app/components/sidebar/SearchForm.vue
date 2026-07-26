<script setup lang="ts">
import { Search } from '@lucide/vue'
import {
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar'

const { openSearch } = useRecipeSearch()
</script>

<template>
  <SidebarGroup class="py-0 px-0">
    <SidebarGroupContent>
      <button
        type="button"
        class="relative flex h-9 w-full items-center rounded-md border border-input bg-white pl-8 pr-2 text-sm text-muted-foreground shadow-xs outline-none transition-colors hover:bg-accent focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        @click="openSearch"
      >
        <Search class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 opacity-50" />
        <span>Search recipes</span>
        <kbd class="ml-auto inline-flex select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span class="text-xs leading-none">⌘</span>K
        </kbd>
      </button>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
