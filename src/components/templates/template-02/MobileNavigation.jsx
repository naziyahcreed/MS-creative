import { useLanguage } from '../../../context/LanguageContext'
import weddingData from './data/weddingData'

export default function MobileNavigation() {
  const { lang, t } = useLanguage()
  const { share } = weddingData

  const items = [
    { id: 'home', labelTa: 'முகப்பு', labelEn: 'Home', emoji: '🛕' },
    { id: 'events', labelTa: 'நிகழ்வுகள்', labelEn: 'Events', emoji: '📅' },
    { id: 'gallery', labelTa: 'நினைவுகள்', labelEn: 'Photos', emoji: '📸' },
    { id: 'venues', labelTa: 'மண்டபம்', labelEn: 'Venues', emoji: '📍' },
    { id: 'share', labelTa: 'பகிர்க', labelEn: 'Share', emoji: '💬' },
  ]

  const handleClick = (id) => {
    if (id === 'share') {
      const el = document.getElementById('share')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        const url = window.location.href
        const text = t(share.textTamil, share.textEnglish)
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + url)}`, '_blank')
      }
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#38030b]/95 border-t border-[#dfb557]/40 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:max-w-[580px] md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"
      aria-label="Navigation"
    >
      <ul className="flex justify-around items-center py-1 px-1">
        {items.map(({ id, labelTa, labelEn, emoji }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => handleClick(id)}
              className="flex min-h-[50px] min-w-[56px] flex-col items-center justify-center gap-0.5 px-1 font-tamil text-[11px] font-bold text-[#f8eed6] hover:text-[#ffe682] active:scale-95 transition"
              aria-label={t(labelTa, labelEn)}
            >
              <span className="text-base leading-none" aria-hidden>
                {emoji}
              </span>
              <span>{t(labelTa, labelEn)}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
