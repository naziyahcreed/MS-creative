import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import weddingData from './data/weddingData'
import { getCountdownParts, getCountdownTarget } from '../../../utils/weddingDay'
import { useLanguage } from '../../../context/LanguageContext'

function Cell({ label, value }) {
  return (
    <div className="countdown-cell">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="cell-number"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="cell-label">{label}</span>
    </div>
  )
}

export default function Countdown({ weddingDayState }) {
  const { lang, t } = useLanguage()
  const { countdown, events, hero } = weddingData
  const targetEvent = events[countdown.targetEvent]
  const target = useMemo(
    () => getCountdownTarget(targetEvent.date, targetEvent.time),
    [targetEvent.date, targetEvent.time],
  )
  const [parts, setParts] = useState(() => getCountdownParts(target))

  useEffect(() => {
    const id = setInterval(() => setParts(getCountdownParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const showToday = weddingDayState === 'today' || parts.complete

  return (
    <section className="relative z-10 px-4 pb-8 md:px-8" aria-labelledby="countdown-heading">
      <div className="mx-auto max-w-lg">
        <div className="countdown-glass-card">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🪔</span>
            <h2 id="countdown-heading" className="font-tamil text-sm sm:text-base font-bold text-[#740a18]">
              {showToday ? t(countdown.todayTamil, countdown.todayEnglish) : t(countdown.tamilHeading, countdown.englishHeading)}
            </h2>
            <span className="text-xl">🪔</span>
          </div>

          <p className="mt-2 font-tamil text-sm font-black text-[#91681e]">
            {t(hero.weddingDateLabelTamil, hero.weddingDateLabelEnglish)} • {t(targetEvent.timeDisplayTamil, targetEvent.timeDisplayEnglish)}
          </p>

          {showToday ? (
            <div className="mt-5 rounded-xl bg-[#740a18] p-4 text-[#ffe682]">
              <p className="font-tamil text-lg font-bold">
                {t('இன்று நம் திருமண நன்னாள்!', 'Today is the Grand Wedding Day!')}
              </p>
              <p className="font-tamil text-xs text-[#f8eed6] mt-1">
                {t('தங்கள் மேலான ஆசிகளுடன் தாலி கட்டும் நற்பொழுது!', 'Solemnized with your divine blessings!')}
              </p>
            </div>
          ) : (
            <div className="countdown-digits-grid" role="timer" aria-live="polite">
              <Cell label={t('நாட்கள்', 'Days')} value={String(parts.days).padStart(2, '0')} />
              <Cell label={t('மணி', 'Hours')} value={String(parts.hours).padStart(2, '0')} />
              <Cell label={t('நிமிடம்', 'Mins')} value={String(parts.minutes).padStart(2, '0')} />
              <Cell label={t('நொடி', 'Secs')} value={String(parts.seconds).padStart(2, '0')} />
            </div>
          )}

          <p className="mt-3.5 font-tamil text-xs text-[#755243]">
            {t('அருள்மிகு சுப்பிரமணிய சுவாமி சந்நிதியில் சுப முகூர்த்தம்', 'Sacred Vivaha Muhurtham at Thiruparankundram')}
          </p>
        </div>
      </div>
    </section>
  )
}
