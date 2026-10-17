import { useEffect, useState } from 'react'
import weddingData from './data/weddingData'

const LABELS = {
  button: '',
  image: 'VIEW',
  gallery: 'OPEN',
  event: 'DETAILS',
  cta: '',
}

export default function CustomCursor({ enabled }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled || !weddingData.features.customCursor) return undefined

    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return undefined

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
      requestAnimationFrame(() => setTrail({ x: e.clientX, y: e.clientY }))
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) {
        setMode('default')
        setLabel('')
        return
      }
      const kind = t.getAttribute('data-cursor')
      setMode(kind || 'default')
      setLabel(LABELS[kind] || '')
    }

    const onLeave = () => {
      setVisible(false)
      setMode('default')
      setLabel('')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled || !weddingData.features.customCursor) return null

  const isRing = mode === 'button' || mode === 'cta'
  const ringSize = mode === 'cta' ? 34 : 28

  return (
    <div className="custom-cursor-root pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <div
        className="absolute rounded-full bg-gold-line/15 blur-xl transition-transform duration-300"
        style={{
          width: 28,
          height: 28,
          left: trail.x - 14,
          top: trail.y - 14,
          opacity: visible ? 1 : 0,
        }}
      />
      {label ? (
        <div
          className="absolute font-serif-display text-[10px] tracking-[0.2em] text-maroon-deep/80"
          style={{ left: pos.x + 12, top: pos.y - 8, opacity: visible ? 1 : 0 }}
        >
          {label}
        </div>
      ) : null}
      <div
        className="absolute rounded-full border border-gold-line/80 bg-gold-line/90 transition-all duration-200 ease-out"
        style={{
          width: isRing ? ringSize : 6,
          height: isRing ? ringSize : 6,
          left: pos.x - (isRing ? ringSize / 2 : 3),
          top: pos.y - (isRing ? ringSize / 2 : 3),
          opacity: visible ? (isRing ? 0.9 : 1) : 0,
          background: isRing ? 'transparent' : undefined,
          boxShadow: mode === 'cta' ? '0 0 12px rgba(196,163,90,0.35)' : undefined,
        }}
      />
    </div>
  )
}
