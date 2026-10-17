import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function Gallery() {
  const { lang, t } = useLanguage()
  const { gallery, originalCard, couple } = weddingData
  const [index, setIndex] = useState(null)
  const [showCardModal, setShowCardModal] = useState(false)

  const close = useCallback(() => {
    setIndex(null)
    setShowCardModal(false)
  }, [])

  useEffect(() => {
    if (index === null && !showCardModal) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (index !== null) {
        if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % gallery.items.length)
        if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + gallery.items.length) % gallery.items.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, showCardModal, close, gallery.items.length])

  return (
    <SectionShell
      id="gallery"
      badge={t('மங்கல நினைவுகள்', 'Cherished Moments')}
      title={t('திருமண புகைப்படத் தொகுப்பு', 'Couple Photo Gallery')}
      subtitle={t('இணைபிரியா அன்பும் மகிழ்ச்சியும்', 'Love, smiles, and togetherness forever')}
      glyph="📸"
      tone="cream"
    >
      <div className="mx-auto mt-6 max-w-xl">
        
        {/* View Original Invitation Card Button */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-[#dfb557] bg-gradient-to-r from-[#740a18] via-[#8b1e2e] to-[#740a18] px-6 py-3 font-tamil text-xs sm:text-sm font-bold text-[#ffe682] shadow-[0_6px_20px_rgba(116,10,24,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-lg filter drop-shadow">📜</span>
            <span className="tracking-wide">
              {t('அசல் திருமண அழைப்பிதழ் அட்டை (Original Card)', 'View Original Invitation Card')}
            </span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>
          <p className="mt-2 font-tamil text-xs text-[#755243]">
            {t('அழைப்பிதழை முழு வடிவில் காண மேலே உள்ள பொத்தானைத் தட்டவும்', 'Tap to view the full authentic printed invitation card')}
          </p>
        </motion.div>

        {/* 4 Photos Grid with Rich Hover Animations */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
          {gallery.items.map((item, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl border-2 border-[#dfb557]/50 bg-[#ffffff] shadow-[0_6px_20px_rgba(78,5,16,0.08)] cursor-pointer transition-all duration-300 hover:border-[#dfb557] hover:shadow-[0_12px_30px_rgba(116,10,24,0.18)] hover:-translate-y-1"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter contrast-[1.02]"
                  loading="lazy"
                />
                
                {/* Golden Overlay Gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#38030b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                  <span className="rounded-full bg-[#dfb557] px-3 py-1 font-tamil text-[11px] font-bold text-[#1a0508] shadow-md">
                    🔍 {t('பெரிதாக்க', 'Enlarge')}
                  </span>
                </div>
              </div>

              {/* Caption Box */}
              <div className="p-3 text-center bg-[#fffcf5] border-t border-[#dfb557]/30">
                <p className="font-tamil text-xs sm:text-sm font-bold text-[#740a18] line-clamp-1">
                  {t(item.captionTamil, item.captionEnglish)}
                </p>
                <p className="mt-0.5 font-serif text-[11px] text-[#91681e] font-semibold">
                  {couple.brideName} &amp; {couple.groomName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery footer hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#91681e]">
          <span>✨</span>
          <span className="font-tamil">
            {t('புகைப்படத்தைத் தட்டினால் முழுத் திரையில் பெரிதாகக் காணலாம்', 'Click any photo to view in high definition lightbox')}
          </span>
          <span>✨</span>
        </div>

      </div>

      {/* High Definition Photo Lightbox Modal */}
      {index !== null ? (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#740a18] text-xl font-bold text-[#ffe682] border-2 border-[#dfb557] shadow-lg transition hover:scale-110 active:scale-95"
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>
          
          {/* Prev button */}
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#740a18]/80 text-2xl font-bold text-[#ffe682] border border-[#dfb557] shadow-lg transition hover:bg-[#740a18] hover:scale-110 active:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i - 1 + gallery.items.length) % gallery.items.length)
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#740a18]/80 text-2xl font-bold text-[#ffe682] border border-[#dfb557] shadow-lg transition hover:bg-[#740a18] hover:scale-110 active:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i + 1) % gallery.items.length)
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <AnimatePresence mode="wait">
            <div className="text-center max-w-lg my-auto">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-2xl border-2 border-[#dfb557] shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-black"
              >
                <img
                  src={gallery.items[index].src}
                  alt={gallery.items[index].alt}
                  className="max-h-[75vh] w-auto mx-auto object-contain"
                />
              </motion.div>
              
              <div className="mt-4 rounded-full bg-[#38030b]/90 border border-[#dfb557] px-6 py-2 inline-block shadow-lg">
                <p className="font-tamil text-sm font-bold text-[#ffe682]">
                  {t(gallery.items[index].captionTamil, gallery.items[index].captionEnglish)}
                </p>
                <p className="font-serif text-xs text-[#edd9b8]/80">
                  {couple.brideName} &amp; {couple.groomName} ({index + 1} / {gallery.items.length})
                </p>
              </div>
            </div>
          </AnimatePresence>
        </div>
      ) : null}

      {/* Original Printed Card Lightbox Modal */}
      {showCardModal ? (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/92 p-4 overflow-y-auto backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#740a18] text-xl font-bold text-[#ffe682] border-2 border-[#dfb557] shadow-lg transition hover:scale-110 active:scale-95"
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>
          
          <div className="relative max-w-md my-auto text-center animate-[scaleUp_0.3s_ease-out]">
            <div className="overflow-hidden rounded-2xl border-2 border-[#dfb557] shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
              <img
                src={originalCard.image}
                alt="Original Wedding Invitation Card"
                className="w-full h-auto object-contain"
              />
            </div>
            
            <div className="mt-3.5 inline-block rounded-full bg-[#38030b]/90 border border-[#dfb557] px-5 py-1.5">
              <p className="font-tamil text-xs font-bold text-[#ffe682]">
                {t(originalCard.titleTamil, originalCard.titleEnglish)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

    </SectionShell>
  )
}
