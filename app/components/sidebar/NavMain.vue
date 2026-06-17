<script setup lang="ts">
const NAV_MENU = [
  {
    title: 'All recipes',
    url: '/dashboard',
  },
  {
    title: 'Favorites',
    url: '#',
  },
  {
    title: 'Collections',
    url: '#',
  },
  {
    title: 'Recently added',
    url: '#',
  },
]
</script>

<template>
  <SidebarGroup class="p-0">
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in NAV_MENU" :key="item.title">
          <SidebarMenuButton as-child>
            <NuxtLink :to="item.url" class="text-muted-foreground h-10 px-3 hover:bg-accent! hover:text-muted-foreground! font-semibold" active-class="bg-primary text-primary-foreground hover:bg-primary! hover:text-primary-foreground!">
              {{ item.title }}
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
