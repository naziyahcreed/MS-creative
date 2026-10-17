import { useState } from 'react'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function VenueMaps() {
  const { lang, t } = useLanguage()
  const { venues } = weddingData
  const [activeTab, setActiveTab] = useState(0)
  const current = venues[activeTab]

  return (
    <SectionShell
      id="venues"
      badge={t('மண்டப இருப்பிடம்', 'How to Reach')}
      title={t('திருமண மண்டப வழிகாட்டி', 'Venue Locations & Google Maps')}
      subtitle={t('மதுரை வசந்தம் மஹால் • சென்னை ரத்னா மஹால்', 'Madurai Vasantham Mahal • Chennai Rathna Mahal')}
      glyph="🗺️"
      tone="white"
    >
      <div className="mx-auto mt-6 max-w-xl">
        
        {/* Tab Switcher */}
        <div className="flex rounded-2xl border-2 border-[#dfb557]/60 bg-[#faf4e6] p-1.5 shadow-sm">
          {venues.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-xl py-2.5 px-2 text-center font-tamil text-xs sm:text-sm font-bold transition-all ${
                activeTab === i
                  ? 'bg-[#740a18] text-[#ffe682] shadow-md'
                  : 'text-[#740a18] hover:bg-[#dfb557]/20'
              }`}
            >
              {t(v.tabLabelTamil, v.tabLabelEnglish)}
            </button>
          ))}
        </div>

        {/* Active Venue Card */}
        <div className="mt-5 rounded-2xl border-2 border-[#dfb557]/45 bg-[#ffffff] p-5 shadow-sm">
          
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#faf4e6] border border-[#dfb557] px-3 py-1 font-tamil text-xs font-bold text-[#b38222]">
              {t(current.eventsSummaryTamil, current.eventsSummaryEnglish)}
            </span>

            <h3 className="mt-2.5 font-tamil text-xl sm:text-2xl font-black text-[#740a18]">
              {t(current.nameTamil, current.nameEnglish)}
            </h3>

            <p className="mt-1 font-tamil text-sm text-[#5c3622]">
              {t(current.addressTamil, current.addressEnglish)}
            </p>

            <p className="mt-1 font-tamil text-xs text-[#91681e] font-semibold">
              📍 {t(current.landmarkTamil, current.landmarkEnglish)}
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-4 overflow-hidden rounded-xl border border-[#dfb557]/40 shadow-inner aspect-[16/10] bg-[#faf4e6]">
            <iframe
              src={current.mapsEmbed}
              title={`Google Map - ${current.nameEnglish}`}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Parking & Directions info */}
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <p className="font-tamil text-xs text-[#755243] flex-1 min-w-[200px]">
              🚗 {t(current.parkingTamil, current.parkingEnglish)}
            </p>

            <a
              href={current.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-map text-xs"
            >
              <span>🧭 {t('வழிகாட்டல் பெற (Google Maps)', 'Get Live Directions')}</span>
              <span>&rarr;</span>
            </a>
          </div>

        </div>

      </div>
    </SectionShell>
  )
}
