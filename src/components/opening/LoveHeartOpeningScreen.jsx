import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LoveHeartOpeningScreen
 * Design 6 from reference: Glowing romantic Love Heart outline
 * with pulsing neon aura, floating rose petals physics, and tap-to-open interaction.
 */
export default function LoveHeartOpeningScreen({ onOpen, couple = {}, weddingDate = '', lang = 'en' }) {
  const [opening, setOpening] = useState(false)
  const canvasRef = useRef(null)

  const handleTap = () => {
    if (opening) return
    setOpening(true)
    setTimeout(() => {
      onOpen?.()
    }, 750)
  }

  const bride = couple.brideName || couple.bride || 'Bride'
  const groom = couple.groomName || couple.groom || 'Groom'
  const brideTa = couple.brideNameTamil || couple.brideTamil || ''
  const groomTa = couple.groomNameTamil || couple.groomTamil || ''

  // Falling 3D Rose Petals Animation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate rose petals
    const petals = Array.from({ length: 32 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h - h,
      size: Math.random() * 10 + 9,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1.2 - 0.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.5 + 0.45,
      color:
        Math.random() > 0.4
          ? '#c92a42'
          : Math.random() > 0.5
          ? '#e03152'
          : '#7f0e21',
    }))

    let animId
    const render = () => {
      ctx.clearRect(0, 0, w, h)
      petals.forEach((p) => {
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.015) * 0.8 + p.speedX
        p.rot += p.rotSpeed

        if (p.y > h + 20) {
          p.y = -20
          p.x = Math.random() * w
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.opacity

        // Draw organic petal shape
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size)
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0)
        ctx.fillStyle = p.color
        ctx.fill()

        // Petal vein highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()
      })
      animId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-between select-none overflow-hidden cursor-pointer bg-black"
        onClick={handleTap}
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
          scale: opening ? 1.08 : 1,
          filter: opening ? 'brightness(1.5) blur(4px)' : 'brightness(1) blur(0px)',
        }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        transition={{ duration: 0.75 }}
      >
        {/* Background Image: Cropped & HD Upscaled Design 6 */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/love-heart-opening-bg-hd.jpg"
            alt="Love Heart Background"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
          />
          {/* Deep Crimson Night Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#100305]/65 via-transparent to-[#120205]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#180307]/40 to-[#0e0204]/85" />
        </div>

        {/* Falling Rose Petals Canvas Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* ============================================================== */}
        {/* CENTRAL GLOWING HEART: HEARTBEAT & RADIANT AURA PULSE          */}
        {/* ============================================================== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: [1, 1.06, 1, 1.04, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            {/* Radiant Warm Ambient Outer Halo */}
            <motion.div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-rose-500/20 blur-3xl"
              animate={{
                opacity: [0.5, 0.85, 0.55],
                scale: [0.95, 1.12, 0.98],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />

            {/* Glowing Golden-Orange Light Sparkle Rays */}
            <motion.div
              className="absolute w-56 h-56 rounded-full bg-amber-400/20 blur-2xl"
              animate={{
                opacity: [0.4, 0.8, 0.45],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />

            {/* SVG Glowing Neon Heart Path Overlay for Perfect Sharpness */}
            <svg
              className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_0_24px_rgba(255,160,80,0.9)] drop-shadow-[0_0_40px_rgba(255,50,90,0.6)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Golden Glow Stroke */}
              <path
                d="M50 86 C20 62, 5 44, 5 26 A 19 19 0 0 1 50 20 A 19 19 0 0 1 95 26 C 95 44, 80 62, 50 86 Z"
                stroke="url(#goldGradient)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />

              {/* Inner Mini Heart */}
              <motion.path
                d="M50 56 C38 45, 30 36, 30 28 A 9 9 0 0 1 50 25 A 9 9 0 0 1 70 28 C 70 36, 62 45, 50 56 Z"
                stroke="#ffe682"
                strokeWidth="1.2"
                fill="none"
                opacity="0.8"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe682" />
                  <stop offset="35%" stopColor="#ffb03a" />
                  <stop offset="70%" stopColor="#ff4d6d" />
                  <stop offset="100%" stopColor="#ffd56b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Sparkles around heart */}
            <span className="absolute -top-3 left-8 text-[#ffe682] text-xs animate-ping">✨</span>
            <span className="absolute top-10 -right-2 text-[#ffd56b] text-sm animate-pulse">✦</span>
            <span className="absolute bottom-6 right-6 text-[#ff8fa3] text-xs animate-ping" style={{ animationDelay: '1s' }}>✦</span>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* TOP: WEDDING INVITATION KICKER & COUPLE NAMES                  */}
        {/* ============================================================== */}
        <div className="relative z-30 pt-10 sm:pt-14 px-6 text-center space-y-2 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#ffd56b]" />
            <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-[#ffe682] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {lang === 'ta' ? 'அன்பின் சங்கமம்' : 'Two Hearts • One Love'}
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#ffd56b]" />
          </motion.div>

          {/* Couple Names in Elegant Typography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="space-y-0.5"
          >
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#fff5f5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {bride.toUpperCase()}
            </h1>
            <p className="font-script text-2xl sm:text-3xl text-[#ffd56b] leading-none drop-shadow">
              &
            </p>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#fff5f5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {groom.toUpperCase()}
            </h1>

            {brideTa && groomTa ? (
              <p className="font-tamil text-xs text-[#fedd87] pt-1 drop-shadow">
                {brideTa} &amp; {groomTa}
              </p>
            ) : null}
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM: "TAP TO OPEN" WITH PULSING CRIMSON-GOLD GLOW           */}
        {/* ============================================================== */}
        <div className="relative z-30 pb-12 sm:pb-16 px-6 text-center space-y-3 flex flex-col items-center">
          {weddingDate ? (
            <p className="font-cinzel text-xs font-semibold tracking-[0.25em] text-[#ffd56b] uppercase drop-shadow">
              {weddingDate}
            </p>
          ) : null}

          {/* Pulsing Tap to Open Button */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(255, 77, 109, 0.4))',
                'drop-shadow(0 0 24px rgba(255, 77, 109, 0.85))',
                'drop-shadow(0 0 10px rgba(255, 77, 109, 0.4))',
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <button
              type="button"
              onClick={handleTap}
              className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2b080d]/90 via-[#450e16]/90 to-[#2b080d]/90 border border-[#ff4d6d]/70 text-[#fff0f3] text-xs font-cinzel font-bold tracking-[0.22em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all group-hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="text-[#ff4d6d] text-sm animate-pulse">❤️</span>
              <span>{lang === 'ta' ? 'அழைப்பிதழைத் திறக்க' : 'Tap to Open'}</span>
              <span className="text-[#ffd56b] text-sm animate-pulse">✨</span>
            </button>
          </motion.div>

          <p className="text-[10px] font-sans tracking-[0.2em] text-[#ffd56b]/80 uppercase drop-shadow">
            {lang === 'ta' ? 'திறக்க தட்டவும்' : 'Touch screen to begin'}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
