import { cva } from 'class-variance-authority'

export { default as Input } from './Input.vue'

export const inputStyle = cva(
  `
    flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3
    py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
    selection:bg-primary selection:text-primary-foreground
    file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm
    file:font-medium file:text-foreground
    placeholder:text-muted-foreground
    focus-visible:border-ring focus-visible:ring-[3px]
    focus-visible:ring-ring/50
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    md:text-sm
    dark:bg-input/30 dark:aria-invalid:ring-destructive/40
  `,
)
