import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@clerk/nuxt',
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nitro-cloudflare-dev',
  ],

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
    clerk: {
      secretKey: '',
    },
    public: {
      clerk: {
        publishableKey: '',
      },
    },
  },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },

    rollupConfig: {
      external: ['pg-native', 'cloudflare:sockets'],
    },
  },
})
