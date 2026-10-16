import { useState } from 'react'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'

export default function ShareSection() {
  const { t, lang } = useLanguage()
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = lang === 'en' ? weddingData.share.textEnglish : weddingData.share.textTamil
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url || 'https://nivi-weds.local')}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Niveditha & Natraj', text, url })
    } else {
      copy()
    }
  }

  return (
    <section className="px-4 py-10">
      <Reveal>
        <SectionTitle title={t(weddingData.share.titleTamil, weddingData.share.titleEnglish)} />
      </Reveal>
      <Reveal>
        <div className="gold-card rounded-[24px] p-6 text-center">
          <GoldCorners />
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${text}${url}`)}`}
              target="_blank"
              rel="noreferrer"
              className="ghost-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
            >
              <Ico.wa className="h-4 w-4 text-[#25d366]" /> WhatsApp
            </a>
            <button type="button" onClick={copy} className="ghost-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Ico.copy className="h-4 w-4" /> {copied ? t('நகலெடுக்கப்பட்டது', 'Copied') : t('நகலெடு', 'Copy Link')}
            </button>
            <button type="button" onClick={nativeShare} className="ghost-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Ico.share className="h-4 w-4" /> {t('பகிர்', 'Share')}
            </button>
          </div>
          <img src={qr} alt="QR code" className="mx-auto mt-6 h-36 w-36 rounded-2xl border-2 border-[#ffd56b]/60 bg-white p-2.5 shadow-xl" />
          <p className="mt-3.5 text-xs text-[#e8d5a3] font-medium">{t('ஸ்கேன் செய்து அழைப்பிதழைத் திறக்கவும்', 'Scan to open the invitation')}</p>
        </div>
      </Reveal>
    </section>
  )
}
