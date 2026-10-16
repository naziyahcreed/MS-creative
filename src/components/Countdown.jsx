import { AnimatePresence, motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { useCountdown } from '../hooks/useCountdown'
import Reveal from './Reveal'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'
import { buildGoogleCalendarUrl } from '../utils/calendar'

export default function Countdown() {
  const { t } = useLanguage()
  const w = weddingData.events.wedding
  const parts = useCountdown(w.date, w.time)

  const items = [
    { n: parts.days, ta: 'நாட்கள்', en: 'Days', isSec: false },
    { n: parts.hours, ta: 'மணி', en: 'Hours', isSec: false },
    { n: parts.minutes, ta: 'நிமிடம்', en: 'Mins', isSec: false },
    { n: parts.seconds, ta: 'வினாடி', en: 'Secs', isSec: true },
  ]

  const calendarUrl = buildGoogleCalendarUrl(
    w,
    `${weddingData.couple.brideName} & ${weddingData.couple.groomName}`
  )

  return (
    <section className="relative overflow-hidden px-3.5 py-10">
      <Reveal>
        {/* Royal Luxury Gold Box Container */}
        <div className="relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-[#d4af6a]/60 bg-gradient-to-b from-[#281810] via-[#1a0f0a] to-[#24150e] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,235,179,0.35)] text-center">
          <GoldCorners />

          {/* Decorative Temple Gopuram & Floral Header */}
          <div className="flex items-center justify-center gap-2 text-[#e8d5a3]">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c4a35a]" />
            <span className="text-xs">🛕</span>
            <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#f4e2b3]">
              {t('சுபமுகூர்த்த நன்னாள்', 'Sacred Muhurtham Countdown')}
            </span>
            <span className="text-xs">🛕</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c4a35a]" />
          </div>

          {/* Main Heading with Shimmering Gold Text */}
          <h2 className="mt-2.5 font-cinzel text-xl sm:text-2xl font-bold tracking-wider gold-text">
            {parts.complete
              ? t(weddingData.countdown.todayTamil, weddingData.countdown.todayEnglish)
              : t(weddingData.countdown.tamilHeading, weddingData.countdown.englishHeading)}
          </h2>

          <p className="mt-1 font-serif text-xs italic text-[#d9c7a6]">
            {t(weddingData.countdown.tamilSub, weddingData.countdown.englishSub)}
          </p>

          {/* 4 Animated Countdown Dials */}
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-2.5">
            {items.map((it) => (
              <div key={it.en} className="flex flex-col items-center">
                {/* Dial Box */}
                <div
                  className={`relative flex h-[4.7rem] w-full max-w-[4.8rem] flex-col items-center justify-center overflow-hidden rounded-2xl border ${
                    it.isSec
                      ? 'border-[#f4e2b3] shadow-[0_0_16px_rgba(244,226,179,0.45)]'
                      : 'border-[#c4a35a]/50 shadow-[0_8px_20px_rgba(0,0,0,0.55)]'
                  } bg-gradient-to-b from-[#382317] via-[#24150e] to-[#1a0f0a]`}
                >
                  {/* Subtle Top Metallic Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#fbf6eb]/60 to-transparent" />

                  {/* Animated Ticking Number */}
                  <div className="relative h-9 w-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={it.n}
                        initial={{ y: -18, opacity: 0.2, scale: 0.92 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 18, opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className={`font-cinzel text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          it.isSec ? 'text-[#ffdd80] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'text-[#f4e2b3]'
                        }`}
                      >
                        {String(it.n).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Pulsing indicator for Seconds */}
                  {it.isSec ? (
                    <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#f4e2b3] animate-ping" />
                  ) : (
                    <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#c4a35a]/40" />
                  )}
                </div>

                {/* Dial Label */}
                <span className="mt-2 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#e8d5a3] uppercase">
                  {t(it.ta, it.en)}
                </span>
              </div>
            ))}
          </div>

          {/* Auspicious Muhurtham Timing Reminder */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-[#c4a35a]/30 bg-[#352115]/60 px-3 py-2 text-[11px] text-[#f4e2b3]">
            <span className="text-[#c4a35a]">✨</span>
            <span className="font-medium">
              {t('முகூர்த்த நேரம்:', 'Muhurtham Time:')}
            </span>
            <span className="font-bold text-[#ffd56b]">
              {t(w.displayDateTamil, w.displayDateEnglish)} • {t(w.timeDisplayTamil, w.timeDisplayEnglish)}
            </span>
          </div>

          {/* Add to Calendar Action Button */}
          <div className="mt-4">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide shadow-lg cursor-pointer"
            >
              <Ico.cal className="h-4 w-4" />
              <span>{t('காலண்டரில் நினைவூட்டல் சேர்க்க', 'Add to Google Calendar')}</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
