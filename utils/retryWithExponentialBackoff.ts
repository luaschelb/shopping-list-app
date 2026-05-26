export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts = 4,
  baseDelayMs = 500,
  maxDelayMs = 5000,
  attemptTimeoutMs = 5000
): Promise<T> {
  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), attemptTimeoutMs)

    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, rej) => controller.signal.addEventListener('abort', () => rej(new Error('timeout'))))
      ])
      clearTimeout(timeout)
      return result as T
    } catch (err) {
      clearTimeout(timeout)
      const isLast = attempt === maxAttempts
      const message = (err as any)?.message || ''
      if (isLast) throw err
      if (/4\d{2}/.test(message)) throw err

      const expDelay = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs)
      const jitter = Math.random() * 100
      await sleep(expDelay + jitter)
    }
  }
  throw new Error('Failed after retries')
}