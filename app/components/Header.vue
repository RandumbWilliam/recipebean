<script setup lang="ts">
import { Menu } from '@lucide/vue'
import { VisuallyHidden } from 'reka-ui'

const open = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')

watch(isDesktop, (desktop) => {
  if (desktop)
    open.value = false
})
</script>

<template>
  <header class="flex items-center h-20 border-b">
    <div class="flex items-center justify-between container">
      <NuxtLink to="/">
        <Logo class="h-7" />
      </NuxtLink>

      <Sheet v-model:open="open">
        <SheetTrigger class="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent class="w-full max-w-none sm:max-w-none">
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
          <div class="grid flex-1 auto-rows-min gap-12 px-4 py-20">
            <nav class="text-lg">
              <ul class="flex flex-col">
                <li>
                  <SheetClose as-child>
                    <NuxtLink to="/" class="block w-full py-3">
                      Recipes
                    </NuxtLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose as-child>
                    <NuxtLink to="/" class="block w-full py-3">
                      Collections
                    </NuxtLink>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose as-child>
                    <NuxtLink to="/" class="block w-full py-3">
                      About
                    </NuxtLink>
                  </SheetClose>
                </li>
                <li>
                  <NuxtLink to="/login" class="block w-full py-3">
                    Sign In
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <Button as-child class="w-full" size="lg">
              <NuxtLink to="/sign-up">
                Start your cookbook
              </NuxtLink>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <nav class="hidden md:flex">
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

      <div class="hidden md:flex items-center gap-1">
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
