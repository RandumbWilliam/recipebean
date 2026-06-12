<script setup lang="ts">

</script>

<template>
  <header class="flex items-center h-20 border-b">
    <div class="flex items-center justify-between  container">
      <Logo class="h-7" />

      <nav>
        <ul class="flex items-center gap-9">
          <li>
            <NuxtLink to="/">
              Recipes
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Collections
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              About
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <Button variant="ghost">
          Sign In
        </Button>
        <Button>Start your cookbook</Button>
      </div>
    </div>
  </header>
</template>
