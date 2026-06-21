<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import NavCategories from './NavCategories.vue'
import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import NavUserSkeleton from './NavUserSkeleton.vue'
import SearchForm from './SearchForm.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const { user, isLoaded } = useUser()
const { data: me } = useFetch('/api/me')

const sidebarUser = computed(() =>
  user.value && me.value && {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.primaryEmailAddress?.emailAddress ?? '',
    pfpId: me.value.pfpId,
  },
)
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader class="py-6 gap-4 group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <SidebarMenuItem>
          <NuxtLink to="/dashboard">
            <Logo class="h-6" />
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
      <SearchForm class="group-data-[collapsible=icon]:hidden" />
    </SidebarHeader>
    <SidebarContent class="gap-5">
      <NavMain />
      <NavCategories />
    </SidebarContent>
    <SidebarFooter>
      <NavUser v-if="isLoaded && sidebarUser" :user="sidebarUser" />
      <NavUserSkeleton v-else />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
