<script setup lang="ts">
import AppSidebar from '~/components/sidebar/AppSidebar.vue'
import MobileBottomNav from '~/components/sidebar/MobileBottomNav.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="pb-20 md:pb-0">
      <slot />
    </SidebarInset>
    <MobileBottomNav />
  </SidebarProvider>
</template>
