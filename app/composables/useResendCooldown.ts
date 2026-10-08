/**
 * Countdown that rate-limits a "Resend code" button on the auth pages. Call
 * `start()` after each successful send; `remaining` counts down to 0, at which
 * point the button can be used again.
 */
export function useResendCooldown(seconds = 30) {
  const remaining = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function start() {
    stop()
    remaining.value = seconds
    timer = setInterval(() => {
      remaining.value -= 1
      if (remaining.value <= 0)
        stop()
    }, 1000)
  }

  onBeforeUnmount(stop)

  return { remaining, start }
}
