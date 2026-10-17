import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LotusOpeningScreen
 * Design 4 from reference: Sacred glowing golden Lotus on rippling waters
 * with floating, swaying animated sky lanterns and flickering candle flames.
 */
export default function LotusOpeningScreen({ onOpen, couple = {}, weddingDate = '', lang = 'en' }) {
  const [opening, setOpening] = useState(false)

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

  // Lantern positions matching Design 4
  const lanterns = [
    { id: 1, left: '12%', top: '14%', size: 'w-10 h-14', delay: 0, duration: 4.8 },
    { id: 2, left: '30%', top: '7%', size: 'w-8 h-12', delay: 0.8, duration: 5.4 },
    { id: 3, left: '68%', top: '9%', size: 'w-9 h-13', delay: 1.5, duration: 5.0 },
    { id: 4, left: '84%', top: '18%', size: 'w-11 h-16', delay: 0.4, duration: 4.5 },
    { id: 5, left: '20%', top: '26%', size: 'w-7 h-10', delay: 1.1, duration: 5.6 },
    { id: 6, left: '76%', top: '28%', size: 'w-8 h-11', delay: 1.9, duration: 5.2 },
  ]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-between select-none overflow-hidden cursor-pointer bg-black"
        onClick={handleTap}
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
          scale: opening ? 1.08 : 1,
          filter: opening ? 'brightness(1.4) blur(4px)' : 'brightness(1) blur(0px)',
        }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        transition={{ duration: 0.75 }}
      >
        {/* Background Image: Cropped & HD Upscaled Design 4 */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/lotus-opening-bg-hd.jpg"
            alt="Lotus on Water"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
          />
          {/* Night atmospheric dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050911]/60 via-transparent to-[#04060a]/85" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#03060c]/30 to-[#020306]/80" />
        </div>

        {/* ============================================================== */}
        {/* ANIMATED FLOATING SKY LANTERNS / CANDLES (Gentle Float & Flame)*/}
        {/* ============================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lanterns.map((l) => (
            <motion.div
              key={l.id}
              className={`absolute ${l.size} flex flex-col items-center justify-center`}
              style={{ left: l.left, top: l.top }}
              animate={{
                y: [0, -14, 0],
                x: [0, 5, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: l.duration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: l.delay,
              }}
            >
              {/* Outer Golden Candle Light Halo Bloom */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-amber-400/25 blur-md"
                animate={{
                  opacity: [0.6, 0.95, 0.65],
                  scale: [0.92, 1.1, 0.95],
                }}
                transition={{
                  duration: 2.2 + l.delay,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              />

              {/* Lantern Shape & Frame */}
              <div className="relative w-full h-full rounded-md border border-[#ffd56b]/50 bg-gradient-to-b from-[#ffea9f]/70 via-[#ffa733]/60 to-[#d9680b]/50 shadow-[0_0_18px_rgba(255,185,55,0.7)] backdrop-blur-xs flex items-center justify-center">
                {/* Inner Flickering Candle Flame Core */}
                <motion.div
                  className="w-2.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffe485]"
                  style={{
                    background:
                      'radial-gradient(circle, #ffffff 20%, #ffe485 55%, #ff8c1a 95%)',
                  }}
                  animate={{
                    scaleY: [1, 1.25, 0.95, 1.15],
                    scaleX: [1, 0.88, 1.08, 0.92],
                    opacity: [0.85, 1, 0.9, 1],
                  }}
                  transition={{
                    duration: 1.4 + (l.id % 3) * 0.3,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Hanging string illusion */}
              <div className="w-[0.75px] h-10 bg-gradient-to-b from-transparent to-[#ffd56b]/40 -top-10 absolute pointer-events-none" />
            </motion.div>
          ))}

          {/* Floating Warm Golden Embers Rising */}
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#ffe485] shadow-[0_0_8px_#ffd56b]"
              style={{
                left: `${10 + (i * 6.5) % 80}%`,
                bottom: `${20 + (i * 5) % 50}%`,
              }}
              animate={{
                y: [0, -120 - (i % 5) * 20],
                x: [0, (i % 2 === 0 ? 1 : -1) * (15 + (i % 10))],
                opacity: [0, 0.85, 0],
                scale: [0.4, 1.2, 0.2],
              }}
              transition={{
                duration: 4.5 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.45) % 4,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* ============================================================== */}
        {/* WATER RIPPLE REFLECTION & LOTUS GOLDEN RADIANCE                 */}
        {/* ============================================================== */}
        <div className="absolute bottom-[30%] sm:bottom-[28%] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center">
          {/* Animated Water Ripple Rings */}
          <motion.div
            className="absolute w-36 h-12 rounded-[50%] border border-[#ffe082]/35"
            animate={{
              scale: [1, 1.6, 2.1],
              opacity: [0.7, 0.3, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute w-28 h-10 rounded-[50%] border border-[#ffca28]/45"
            animate={{
              scale: [0.9, 1.5, 1.9],
              opacity: [0.8, 0.4, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: 1.6,
              ease: 'easeOut',
            }}
          />

          {/* Golden Radiance Bloom under Lotus */}
          <motion.div
            className="w-32 h-14 rounded-[50%] bg-gradient-to-t from-[#ffb300]/40 to-transparent blur-md"
            animate={{
              opacity: [0.55, 0.9, 0.6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* ============================================================== */}
        {/* TOP BRANDING & SACRED INVOCATION                               */}
        {/* ============================================================== */}
        <div className="relative z-20 pt-10 sm:pt-14 px-6 text-center space-y-2 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#ffd56b]" />
            <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-[#ffe682] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {lang === 'ta' ? 'திருமண அழைப்பிதழ்' : 'Wedding Invitation'}
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#ffd56b]" />
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="space-y-0.5"
          >
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#fff6d8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {bride.toUpperCase()}
            </h1>
            <p className="font-script text-xl sm:text-2xl text-[#ffd56b] leading-none drop-shadow">
              &
            </p>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#fff6d8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
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
        {/* BOTTOM: "TAP TO OPEN" WITH PULSING GLOW & AUSPICIOUS MOTIF     */}
        {/* ============================================================== */}
        <div className="relative z-20 pb-12 sm:pb-16 px-6 text-center space-y-3 flex flex-col items-center">
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
                'drop-shadow(0 0 10px rgba(255, 213, 107, 0.4))',
                'drop-shadow(0 0 22px rgba(255, 213, 107, 0.85))',
                'drop-shadow(0 0 10px rgba(255, 213, 107, 0.4))',
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
              className="group relative px-7 py-3 rounded-full bg-gradient-to-r from-[#2a1708]/90 via-[#42260f]/90 to-[#2a1708]/90 border border-[#ffd56b]/70 text-[#fff4cb] text-xs font-cinzel font-bold tracking-[0.22em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all group-hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="text-[#ffd56b] text-sm animate-pulse">❖</span>
              <span>{lang === 'ta' ? 'அழைப்பிதழைத் திறக்க' : 'Tap to Open'}</span>
              <span className="text-[#ffd56b] text-sm animate-pulse">❖</span>
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
