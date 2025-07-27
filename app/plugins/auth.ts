export default defineNuxtPlugin(async () => {
  const { authenticate } = useAuth()

  await authenticate()
})
