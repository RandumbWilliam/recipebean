import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    '/': { prerender: true },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@clerk/nuxt', 'shadcn-nuxt', '@nuxt/fonts', '@vueuse/nuxt'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['~/assets/css/tailwind.css'],
  fonts: {
    families: [
      { name: 'Hanken Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Newsreader', provider: 'google', weights: [400, 500, 600, 700], styles: ['normal', 'italic'] },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  runtimeConfig: {
    db: {
      host: 'localhost',
      port: 5432,
      user: '',
      password: '',
      name: '',
    },
    clerk: {
      secretKey: '',
    },
    public: {
      clerk: {
        publishableKey: '',
      },
    },
  },
})
