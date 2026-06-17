<script setup lang="ts">
const CATEGORIES = [
  {
    title: 'Breakfast',
    url: '#',
    color: '#ffb347',
  },
  {
    title: 'Dinner',
    url: '#',
    color: '#ff596d',
  },
  {
    title: 'Baking',
    url: '#',
    color: '#c58bd6',
  },
  {
    title: 'Vegetarian',
    url: '#',
    color: '#6ba368',
  },
]
</script>

<template>
  <SidebarGroup class="p-0">
    <SidebarGroupLabel class="uppercase text-muted-foreground font-bold tracking-[0.08em]">
      Categories
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in CATEGORIES" :key="item.title">
          <SidebarMenuButton as-child>
            <NuxtLink :to="item.url" class="text-muted-foreground font-semibold hover:bg-accent! hover:text-muted-foreground!">
              <span class="h-2 w-2 rounded-full" :style="`background-color: ${item.color};`" />
              {{ item.title }}
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
