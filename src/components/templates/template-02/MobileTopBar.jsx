import weddingData from './data/weddingData'
import LanguageSwitchButton from './LanguageSwitchButton'
import { useLanguage } from '../../../context/LanguageContext'

export default function MobileTopBar() {
  const { lang, t } = useLanguage()
  const { share } = weddingData

  const handleWhatsAppShare = () => {
    const url = window.location.href
    const text = t(share.textTamil, share.textEnglish)
    const fullMessage = `${text}${url}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`, '_blank')
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#dfb557]/40 bg-[#38030b]/95 px-4 py-2.5 backdrop-blur-md shadow-md">
      <div className="flex items-center gap-2">
        <span className="font-serif text-sm font-extrabold text-[#ffe682]">
          {weddingData.couple.initials}
        </span>
        <span className="font-tamil text-xs text-[#edd9b8]/85 font-semibold">
          | {t('சுபமுகூர்த்தம்', 'Subha Vivaham')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitchButton />

        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-3 py-1 font-tamil text-xs font-bold text-white shadow-sm active:scale-95 transition hover:opacity-95"
          title={t('வாட்ஸ்அப்பில் பகிர்க', 'Share on WhatsApp')}
        >
          <span>💬</span>
          <span>{t('பகிர்க', 'Share')}</span>
        </button>
      </div>
    </header>
  )
}
