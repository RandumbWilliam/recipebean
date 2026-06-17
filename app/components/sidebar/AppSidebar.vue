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
  <Sidebar v-bind="props" class="py-6 px-4">
    <SidebarHeader class="p-0 gap-4 mb-5">
      <div class="w-fit">
        <Logo class="h-6" />
      </div>
      <SearchForm />
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
