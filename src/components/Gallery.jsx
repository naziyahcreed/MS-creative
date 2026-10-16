import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'

export default function Gallery() {
  const { t } = useLanguage()
  const { gallery } = weddingData
  const [open, setOpen] = useState(null)

  const handlePrev = (e) => {
    e?.stopPropagation()
    setOpen((prev) => (prev > 0 ? prev - 1 : gallery.items.length - 1))
  }

  const handleNext = (e) => {
    e?.stopPropagation()
    setOpen((prev) => (prev < gallery.items.length - 1 ? prev + 1 : 0))
  }

  // Lock body scroll and handle keyboard navigation when lightbox is open
  useEffect(() => {
    if (open === null) return undefined

    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalTouch = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.touchAction = originalTouch
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, gallery.items.length])

  return (
    <section id="gallery" className="px-4 py-10">
      <Reveal>
        <SectionTitle
          title={t(gallery.titleTamil, gallery.titleEnglish)}
          sub={t(gallery.subtitleTamil, gallery.subtitleEnglish)}
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-3">
        {gallery.items.map((item, i) => (
          <Reveal
            key={item.src}
            delay={i * 0.04}
            className={i === 0 ? 'col-span-2' : ''}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`gold-card group relative block w-full overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? 'h-72 sm:h-80' : 'aspect-[9/16]'
              }`}
            >
              <GoldCorners />
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a100a]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                <span className="text-[11px] font-medium text-[#f4e2b3] drop-shadow-md">
                  {item.alt}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Portal to document.body: completely escapes transformed containers so position:fixed is true viewport-fixed */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open !== null ? (
              <motion.div
                className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md select-none touch-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              >
                {/* Close Button */}
                <button
                  type="button"
                  className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2.5 text-white hover:bg-black/85 transition-colors cursor-pointer"
                  aria-label="Close"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen(null)
                  }}
                >
                  <Ico.close className="h-6 w-6" />
                </button>

                {/* Prev Button */}
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-3 text-[#f4e2b3] hover:bg-black/90 transition-colors cursor-pointer"
                  aria-label="Previous"
                  onClick={handlePrev}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-3 text-[#f4e2b3] hover:bg-black/90 transition-colors cursor-pointer"
                  aria-label="Next"
                  onClick={handleNext}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Centered Image Card with zero extra scrollable space */}
                <div
                  className="relative flex flex-col items-center justify-center max-h-[88vh] max-w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    key={gallery.items[open].src}
                    src={gallery.items[open].src}
                    alt={gallery.items[open].alt}
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.94, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="max-h-[78vh] max-w-[90vw] md:max-w-md rounded-2xl object-contain shadow-2xl border border-[#c4a35a]/40"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-[#f4e2b3] font-serif">
                      {gallery.items[open].alt}
                    </p>
                    <p className="text-xs text-[#c4a35a] font-semibold mt-0.5">
                      {open + 1} / {gallery.items.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
