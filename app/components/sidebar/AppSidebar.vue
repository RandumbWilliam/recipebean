<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import NavCategories from './NavCategories.vue'
import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import NavUserSkeleton from './NavUserSkeleton.vue'
import SearchForm from './SearchForm.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const currentUser = useCurrentUser()
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader class="py-6 gap-4">
      <div class="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
        <NuxtLink to="/dashboard" class="group-data-[collapsible=icon]:hidden">
          <Logo class="h-6" />
        </NuxtLink>
        <SidebarTrigger />
      </div>
      <SearchForm class="group-data-[collapsible=icon]:hidden" />
    </SidebarHeader>
    <SidebarContent class="gap-5">
      <NavMain />
      <NavCategories />
    </SidebarContent>
    <SidebarFooter>
      <NavUser v-if="currentUser" :user="currentUser" />
      <NavUserSkeleton v-else />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
