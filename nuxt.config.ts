import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@clerk/nuxt',
    'shadcn-nuxt',
    '@nuxt/fonts',
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
        signInUrl: '',
        signUpUrl: '',
        signInFallbackRedirectUrl: '',
        signUpFallbackRedirectUrl: '',
      },
    },
  },
})
