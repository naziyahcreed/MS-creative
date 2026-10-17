import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export default function ParticleCanvas({ active = true }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active || reduced) return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = window.innerWidth < 768 ? 32 : 55
    const colors = [
      '#ffe682', // Bright gold
      '#dfb557', // Temple gold
      '#ffb703', // Marigold / Haldi yellow
      '#fb8500', // Marigold orange
      '#b81424', // Kumkum red petal
      '#fffdf9', // Jasmine white
    ]

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1.2,
      vy: Math.random() * 0.7 + 0.3,
      vx: Math.random() * 0.5 - 0.25,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() * 0.04 - 0.02),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.55 + 0.25,
      isPetal: Math.random() > 0.45,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.y += p.vy
        p.x += Math.sin(p.y * 0.015) * 0.6 + p.vx
        p.angle += p.vAngle

        if (p.y > h + 15) {
          p.y = -15
          p.x = Math.random() * w
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.alpha

        if (p.isPetal) {
          // Teardrop / Petal shape
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        } else {
          // Sparkling golden star/circle
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowBlur = 8
          ctx.shadowColor = p.color
          ctx.fill()
        }

        ctx.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden
    />
  )
}
