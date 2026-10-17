import { useState } from 'react'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function ShareSection() {
  const { lang, t } = useLanguage()
  const { share, couple } = weddingData
  const [copied, setCopied] = useState(false)

  const handleWhatsAppRedirect = () => {
    const url = window.location.href
    const text = t(share.textTamil, share.textEnglish)
    const fullMessage = `${text}${url}`
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <SectionShell
      id="share"
      badge={t('அழைப்பிதழை பகிர்க', 'Share Invitation')}
      title={t('வாட்ஸ்அப்பில் அழைப்பிதழைப் பகிரவும்', 'Share on WhatsApp')}
      subtitle={`${couple.brideName} & ${couple.groomName}`}
      glyph="💬"
      tone="white"
    >
      <div className="mx-auto mt-6 max-w-md text-center">
        <p className="font-tamil text-sm sm:text-base leading-relaxed text-[#5c3622]">
          {t(
            'உங்கள் உற்றார், உறவினர்கள் மற்றும் நண்பர்களுக்கு இந்த திருமண அழைப்பிதழை வாட்ஸ்அப் மூலம் உடனடியாக அனுப்பி மகிழுங்கள்.',
            'Send this royal wedding invitation directly to your beloved family and friends on WhatsApp.'
          )}
        </p>

        {/* WhatsApp Direct Share Button with animation */}
        <div className="mt-6 flex flex-col items-center gap-3.5">
          <button
            type="button"
            onClick={handleWhatsAppRedirect}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] px-8 py-4 font-tamil text-base font-black text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)]"
          >
            {/* Animated Pulse Ring */}
            <span className="absolute -inset-0.5 rounded-2xl bg-[#25D366] opacity-35 blur-sm group-hover:opacity-60 transition duration-300 animate-pulse" />
            
            <span className="relative text-2xl filter drop-shadow">💬</span>
            <span className="relative tracking-wide">
              {t('வாட்ஸ்அப்பில் பகிரவும் (Share on WhatsApp)', 'Share on WhatsApp')}
            </span>
            <span className="relative text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>

          {/* Copy Link Secondary Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-full border-1.5 border-[#dfb557] bg-[#faf4e6] px-5 py-2 font-tamil text-xs font-bold text-[#740a18] shadow-sm transition hover:bg-[#dfb557]/20 active:scale-95"
          >
            <span>🔗</span>
            <span>
              {copied
                ? t('இணைப்பு நகலெடுக்கப்பட்டது! ✅', 'Link Copied! ✅')
                : t('இணைப்பை நகலெடுக்க (Copy Link)', 'Copy Link')}
            </span>
          </button>
        </div>
      </div>
    </SectionShell>
  )
}
