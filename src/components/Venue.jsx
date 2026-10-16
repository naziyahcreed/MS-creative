import { useState } from 'react'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'

export default function Venue() {
  const { t } = useLanguage()
  const [tab, setTab] = useState(0)
  const v = weddingData.venues[tab]

  return (
    <section id="venue" className="px-4 py-10">
      <Reveal>
        <SectionTitle
          title={t('நம் மங்கல மண்டபங்கள்', 'Wedding & Reception Venues')}
          sub={t('திருமணம் & வரவேற்பு நடைபெறும் இடங்கள்', 'Locate the Wedding & Reception Halls')}
        />
      </Reveal>

      {/* Tabs with clear Hall Type indicators */}
      <div className="mb-5 grid grid-cols-2 gap-2">
        {weddingData.venues.map((item, i) => {
          const isSelected = tab === i
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(i)}
              className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all cursor-pointer ${
                isSelected
                  ? 'gold-btn shadow-md'
                  : 'ghost-btn bg-white/70 hover:bg-[#c4a35a]/20'
              }`}
            >
              <span className={`text-[11px] font-bold tracking-wide ${isSelected ? 'text-white' : 'text-[#8b6914]'}`}>
                {t(item.shortTypeTamil, item.shortTypeEnglish)}
              </span>
              <span className={`text-[12px] font-serif font-medium mt-0.5 ${isSelected ? 'text-[#f4e2b3]' : 'text-[#5c3d2e]'}`}>
                {t(item.nameTamil, item.nameEnglish)}
              </span>
            </button>
          )
        })}
      </div>

      <Reveal>
        <div className="gold-card overflow-hidden rounded-[24px]">
          <GoldCorners />
          <div className="relative">
            <img src={v.image} alt={v.nameEnglish} className="h-44 w-full object-cover" />
            <div className="absolute top-3 left-3 rounded-full bg-[#1a100a]/85 backdrop-blur-sm px-3 py-1 border border-[#c4a35a]/50">
              <span className="text-[11px] font-semibold text-[#f4e2b3]">
                {t(v.hallTypeTamil, v.hallTypeEnglish)}
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-serif text-2xl font-bold text-[#f4e2b3]">
              {t(v.nameTamil, v.nameEnglish)}
            </h3>
            <p className="mt-1 text-sm text-[#e8d5a3] font-medium">
              {t(v.placeTamil, v.placeEnglish)}
            </p>

            {/* Events happening at this specific hall */}
            <div className="mt-4 rounded-xl border border-[#c4a35a]/40 bg-[#1c0f0a]/80 p-3.5 space-y-2.5">
              <p className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#ffd56b]">
                {t('இம்மண்டபத்தில் நடைபெறும் நிகழ்வுகள்:', 'Events at this Hall:')}
              </p>
              {v.eventSchedule?.map((ev, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-[#c4a35a] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#f4e2b3]">{t(ev.nameTa, ev.nameEn)}</span>
                    <p className="text-[11px] text-[#ffd56b]">{t(ev.timeTa, ev.timeEn)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3.5 flex items-center gap-1.5 text-xs text-[#e8d5a3]">
              <Ico.pin className="h-3.5 w-3.5 text-[#c4a35a] shrink-0" />
              <span>{t(v.landmarkTamil, v.landmarkEnglish)}</span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#d9c7a6]">
              <span className="text-[#ffd56b]">🅿️</span>
              <span>{t(v.parkingTamil, v.parkingEnglish)}</span>
            </div>

            <a
              href={v.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold shadow"
            >
              <Ico.pin className="h-4 w-4" /> {t('கூகுள் மேப்பில் வழி காண்', 'View on Google Maps')}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
