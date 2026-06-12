// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@clerk/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  runtimeConfig: {
    clerk: {
      secretKey: '',
    },
    public: {
      clerk: {
        publishableKey: '',
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
})
