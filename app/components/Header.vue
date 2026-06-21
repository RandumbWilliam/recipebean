<template>
  <header class="flex items-center h-20 border-b">
    <div class="flex items-center justify-between  container">
      <NuxtLink to="/">
        <Logo class="h-7" />
      </NuxtLink>

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

      <div class="flex items-center gap-1">
        <Button variant="ghost" as-child>
          <NuxtLink to="/login">
            Sign In
          </NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink to="/sign-up">
            Start your cookbook
          </NuxtLink>
        </Button>
      </div>
    </div>
  </header>
</template>
