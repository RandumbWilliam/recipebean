<template>
  <div class="grid h-screen">
    <Header
      class="
        fixed w-full px-2
        sm:px-4
        md:px-8
      "
    />
    <main
      class="
        mx-auto w-full max-w-[1440px] px-2 pt-20 pb-8
        sm:px-4
        md:px-8
      "
    >
      <slot />
    </main>
  </div>
</template>
