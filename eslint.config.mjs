import antfu from '@antfu/eslint-config'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu(
  {
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      ...betterTailwindcss.configs['recommended-warn'].rules,
      'no-console': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/css/tailwind.css',
      },
    },
    ignores: ['**/migrations/*'],
  },
))
