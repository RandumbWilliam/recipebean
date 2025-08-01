<script setup lang="ts">
const { authUser, logout } = useAuth()
</script>

<template>
  <header
    class="h-20 border-b bg-background"
  >
    <div
      class="
        mx-auto flex h-full w-full max-w-[1440px] items-center justify-between
      "
    >
      <NuxtLink to="/recipes">
        <img
          src="/logo_primary.svg" class="
            w-[120px]
            sm:w-[180px]
          "
        >
      </NuxtLink>

      <DropdownMenu v-if="authUser">
        <DropdownMenuTrigger>
          <div
            class="
              flex h-10 w-10 items-center justify-center rounded-full bg-muted
            "
          >
            B
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-40" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click.prevent="logout">
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
