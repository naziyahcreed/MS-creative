import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function PetalCanvas({ active }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active || reduced) return undefined
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const size = () => ({
      w: Math.min(window.innerWidth, 430),
      h: window.innerHeight,
    })
    const petals = Array.from({ length: 12 }, () => {
      const { w, h } = size()
      return {
        x: Math.random() * w,
        y: Math.random() * -h,
        r: 3 + Math.random() * 5,
        s: 0.8 + Math.random() * 1.2,
        a: Math.random() * Math.PI,
        c: ['#e8a838', '#d45a3a', '#f0c36a', '#c43b2e'][Math.floor(Math.random() * 4)],
      }
    })

    const resize = () => {
      const { w, h } = size()
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach((p) => {
        p.y += p.s
        p.x += Math.sin(p.a) * 0.5
        p.a += 0.01
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.a)
        ctx.fillStyle = p.c
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, reduced])

  if (!active || reduced) return null
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 mx-auto z-30 max-w-[var(--invite-max)] h-dvh w-full"
      style={{ willChange: 'contents', transform: 'translateZ(0)' }}
      aria-hidden
    />
  )
}
