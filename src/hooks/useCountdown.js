import { useEffect, useState } from 'react'
import { getCountdownParts, getCountdownTarget } from '../utils/weddingDay'

export function useCountdown(dateStr, timeStr) {
  const [parts, setParts] = useState(() =>
    getCountdownParts(getCountdownTarget(dateStr, timeStr)),
  )

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(getCountdownTarget(dateStr, timeStr)))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [dateStr, timeStr])

  return parts
}
