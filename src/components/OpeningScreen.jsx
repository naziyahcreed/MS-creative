import { useState } from 'react'
import { motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { useCountdown } from '../hooks/useCountdown'
import LanguageToggle from './LanguageToggle'

import BrandHeader from './BrandHeader'

export default function OpeningScreen({ onOpen }) {
  const { t, lang } = useLanguage()
  const { opening, couple } = weddingData
  const w = weddingData.events.wedding
  const parts = useCountdown(w.date, w.time)
  const [animKey, setAnimKey] = useState(0)

  const handleReplay = (e) => {
    e.stopPropagation()
    setAnimKey((prev) => prev + 1)
  }

  return (
    <section className="relative min-h-dvh overflow-hidden select-none">
      {/* Background Image & Deep Royal Warm Gradient Overlay */}
      <img
        src="/images/opening-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140a06]/70 via-[#1a0f0a]/50 to-[#120804]/85" />

      {/* Floating Golden Dust Background Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-[18%] left-[10%] text-[#ffd56b]/60 text-xs gold-sparkle" style={{ animationDelay: '0.2s' }}>✦</span>
        <span className="absolute top-[28%] right-[12%] text-[#ffe8a3]/70 text-sm gold-sparkle" style={{ animationDelay: '1.2s' }}>✨</span>
        <span className="absolute top-[68%] left-[14%] text-[#ffd56b]/50 text-xs gold-sparkle" style={{ animationDelay: '0.8s' }}>✦</span>
        <span className="absolute top-[78%] right-[16%] text-[#ffd56b]/60 text-xs gold-sparkle" style={{ animationDelay: '1.7s' }}>✨</span>
      </div>

      {/* Top Bar with Brand Heading, Language Toggle & Replay Intro Button */}
      <div className="absolute top-[max(12px,env(safe-area-inset-top))] inset-x-3 z-30 flex items-center justify-between gap-2">
        <BrandHeader />

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleReplay}
            title="Replay intro animation"
            className="flex items-center gap-1 rounded-full border border-[#e9bfe2]/30 bg-gradient-to-r from-[#3b0f38]/90 to-[#2c0b2a]/90 px-2.5 py-1 text-[9px] uppercase font-cinzel tracking-wider text-[#f4e2b3] backdrop-blur-md hover:border-[#e9bfe2]/60 hover:bg-[#45143d] transition-all cursor-pointer shadow-[0_2px_8px_rgba(69,20,61,0.4)]"
          >
            <span className="text-[#ffd56b]">✨</span>
            <span className="hidden xs:inline sm:inline">{lang === 'ta' ? 'மீண்டும்' : 'Replay'}</span>
          </button>

          <LanguageToggle dark />
        </div>
      </div>

      <div className="relative z-20 flex min-h-dvh flex-col items-center justify-center px-4 py-10 text-center">
        <div key={animKey} className="w-full max-w-sm flex flex-col items-center">
          
          {/* Top Section: Kicker & Sacred Tamil Quote (Fades in gracefully as Name Settles) */}
          <motion.div
            initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#ffd56b]" />
              <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-[#f4e2b3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {opening.kicker}
              </p>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#ffd56b]" />
            </div>

            <h1 className="mt-2.5 font-tamil text-[clamp(1.15rem,5.5vw,1.45rem)] font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {opening.quoteTamil}
            </h1>
          </motion.div>

          {/* ============================================================== */}
          {/* HERO NAME REVEAL: Starts BIG with golden light, then smoothly  */}
          {/* scales into position with running animated golden border!      */}
          {/* ============================================================== */}
          <div className="relative mt-4 mb-3 w-full flex items-center justify-center">
            
            {/* Ambient Golden Radiant Aura (Blooms with golden light during entrance) */}
            <motion.div
              className="gold-aura-halo absolute -inset-8 rounded-full pointer-events-none"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: [0.3, 1.4, 1.1, 0.95],
                opacity: [0, 0.95, 0.7, 0.5],
              }}
              transition={{
                duration: 2.8,
                times: [0, 0.35, 0.7, 1],
                ease: 'easeOut',
              }}
            />

            {/* Glowing Golden Horizontal Lens Flare Streak (Expands across during intro) */}
            <motion.div
              className="absolute -inset-x-8 top-1/2 -translate-y-1/2 h-[2.5px] rounded-full pointer-events-none z-30"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,213,107,0.3) 15%, #ffffff 50%, rgba(255,213,107,0.3) 85%, transparent 100%)',
                boxShadow:
                  '0 0 16px rgba(255, 215, 107, 0.95), 0 0 32px rgba(255, 255, 255, 0.8)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1.4, 1.1, 0],
                opacity: [0, 1, 0.85, 0],
              }}
              transition={{
                duration: 2.3,
                times: [0, 0.35, 0.68, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Entrance Sparkling Accents */}
            <motion.div
              className="pointer-events-none absolute -top-4 -left-2 text-[#ffd56b] text-base gold-sparkle z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              ✦
            </motion.div>
            <motion.div
              className="pointer-events-none absolute -bottom-3 -right-2 text-[#fff3c4] text-base gold-sparkle z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              ✦
            </motion.div>

            {/* Main Name Card Box with Framer Motion Scale & Position Transition */}
            <motion.div
              className="w-full max-w-[290px] relative z-20 cursor-pointer"
              onClick={handleReplay}
              title="Click to replay intro animation"
              initial={{
                scale: 1.35,
                y: 20,
                opacity: 0,
                filter: 'drop-shadow(0 0 35px rgba(255, 215, 107, 0.95))',
              }}
              animate={{
                scale: [1.35, 1.35, 1.15, 1],
                y: [20, 20, 8, 0],
                opacity: [0, 1, 1, 1],
                filter: [
                  'drop-shadow(0 0 35px rgba(255, 215, 107, 0.95))',
                  'drop-shadow(0 0 45px rgba(255, 215, 107, 1))',
                  'drop-shadow(0 0 25px rgba(255, 215, 107, 0.75))',
                  'drop-shadow(0 0 18px rgba(255, 215, 107, 0.45))',
                ],
              }}
              transition={{
                duration: 2.8,
                times: [0, 0.3, 0.68, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Animated Running Golden Border Container */}
              <div className="gold-running-border">
                {/* Inner Royal Card Content */}
                <div className="gold-running-border-inner px-4 py-4 sm:py-5 overflow-hidden">
                  
                  {/* Ornate Gold Corner Motifs */}
                  <span className="absolute top-2 left-2 text-[#ffd56b]/80 text-[10px] pointer-events-none select-none">❖</span>
                  <span className="absolute top-2 right-2 text-[#ffd56b]/80 text-[10px] pointer-events-none select-none">❖</span>
                  <span className="absolute bottom-2 left-2 text-[#ffd56b]/80 text-[10px] pointer-events-none select-none">❖</span>
                  <span className="absolute bottom-2 right-2 text-[#ffd56b]/80 text-[10px] pointer-events-none select-none">❖</span>

                  {/* Inner Fine Golden Hairline Frame */}
                  <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#ffd56b]/25" />

                  {/* Periodic Sweeping Golden Light Sheen Beam */}
                  <div className="gold-light-sheen" />

                  {/* Auspicious Golden Royal Top Motif */}
                  <div className="flex items-center justify-center gap-2 mb-1.5 text-[#ffd56b]">
                    <span className="text-[9px] gold-sparkle">✦</span>
                    <span className="text-xs tracking-[0.25em] text-[#f4e2b3]">❖ ⚜ ❖</span>
                    <span className="text-[9px] gold-sparkle" style={{ animationDelay: '0.6s' }}>✦</span>
                  </div>

                  {/* Couple Names in Rich Royal Gold */}
                  <div className="relative py-0.5">
                    {/* Bride Name */}
                    <p className="font-cinzel text-[clamp(1.5rem,7vw,1.85rem)] font-bold tracking-[0.14em] royal-gold-text leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {couple.brideName.toUpperCase()}
                    </p>

                    {/* Royal Script Ampersand with Golden Glow */}
                    <div className="flex items-center justify-center my-0.5">
                      <span className="font-script text-[clamp(2rem,9vw,2.4rem)] leading-none text-[#ffd56b] drop-shadow-[0_0_12px_rgba(255,213,107,0.85)]">
                        &
                      </span>
                    </div>

                    {/* Groom Name */}
                    <p className="font-cinzel text-[clamp(1.5rem,7vw,1.85rem)] font-bold tracking-[0.14em] royal-gold-text leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {couple.groomName.toUpperCase()}
                    </p>

                    {/* Tamil Couple Name Subtitle for Authentic Cultural Grandeur */}
                    <p className="mt-2 font-tamil text-[11px] tracking-wider text-[#f4e2b3]/85 drop-shadow">
                      {couple.brideNameTamil} &amp; {couple.groomNameTamil}
                    </p>
                  </div>

                  {/* Auspicious Golden Bottom Divider */}
                  <div className="mt-2 flex items-center justify-center gap-2 text-[#ffd56b]/70">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#ffd56b]/60" />
                    <span className="text-[8px] text-[#ffd56b]">✦</span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#ffd56b]/60" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section: Blessing, Muhurtham Countdown Box & Open Button */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
          >
            <p className="font-serif text-sm italic text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t(opening.blessingTamil, opening.blessingEnglish)}
            </p>

            {/* Live Muhurtham Countdown Jewel Box */}
            <div className="mx-auto mt-4 w-full max-w-[310px] rounded-2xl border border-[#ffd56b]/50 bg-black/65 p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-[#ffd56b]">
                <span className="text-[10px]">✨</span>
                <p className="font-cinzel text-[9px] font-bold uppercase tracking-[0.22em] text-[#f4e2b3]">
                  {t('நம் திருமணத்திற்கு இன்னும்', 'Time Until Muhurtham')}
                </p>
                <span className="text-[10px]">✨</span>
              </div>

              <div className="mt-2 grid grid-cols-4 gap-1.5 text-center">
                {[
                  { n: parts.days, l: t('நாட்கள்', 'Days'), isSec: false },
                  { n: parts.hours, l: t('மணி', 'Hours'), isSec: false },
                  { n: parts.minutes, l: t('நிமிடம்', 'Mins'), isSec: false },
                  { n: parts.seconds, l: t('வினாடி', 'Secs'), isSec: true },
                ].map((it) => (
                  <div
                    key={it.l}
                    className={`flex flex-col items-center justify-center rounded-xl border ${
                      it.isSec
                        ? 'border-[#ffd56b]/80 bg-[#351e12]/90 shadow-[0_0_12px_rgba(255,213,107,0.35)]'
                        : 'border-[#c4a35a]/35 bg-black/55'
                    } py-1 px-0.5`}
                  >
                    <span
                      className={`font-cinzel text-lg sm:text-xl font-black leading-tight ${
                        it.isSec ? 'text-[#ffd56b]' : 'text-white'
                      }`}
                    >
                      {String(it.n).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] tracking-wider text-[#e8d5a3] uppercase font-semibold">
                      {it.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Royal Golden Open Invitation Button */}
            <button
              type="button"
              onClick={onOpen}
              className="gold-btn pulse-glow mt-5 rounded-full px-8 py-3 font-cinzel text-xs tracking-[0.22em] uppercase font-bold cursor-pointer"
            >
              {t(opening.buttonTamil, opening.buttonEnglish)}
            </button>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/75 drop-shadow">
              {t(opening.tapTamil, opening.tapEnglish)}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
