import { useState } from 'react'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'

export default function HowToReach() {
  const { t } = useLanguage()
  const [tab, setTab] = useState(0)
  const v = weddingData.venues[tab]

  return (
    <section className="px-4 py-10">
      <Reveal>
        <SectionTitle
          title={t('வழி காண', 'How to Reach')}
          sub={t('எளிதாக வந்து சேருங்கள்', 'Easy to find, always')}
        />
      </Reveal>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {weddingData.venues.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(i)}
            className={`rounded-full px-3 py-1.5 text-xs ${tab === i ? 'gold-btn' : 'ghost-btn'}`}
          >
            {t(item.nameTamil, item.nameEnglish)}
          </button>
        ))}
      </div>
      <Reveal>
        <div className="gold-card rounded-[24px] p-5">
          <GoldCorners />
          <Row label={t('முகவரி', 'Address')} value={`${t(v.nameTamil, v.nameEnglish)}, ${t(v.placeTamil, v.placeEnglish)}`} />
          <Row label={t('அடையாளம்', 'Landmark')} value={t(v.landmarkTamil, v.landmarkEnglish)} />
          <Row label={t('பார்க்கிங்', 'Parking')} value={t(v.parkingTamil, v.parkingEnglish)} />
          <a
            href={v.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="gold-btn mt-2 inline-block rounded-full px-4 py-2 text-xs"
          >
            {t('Google Maps திற', 'Open in Google Maps')}
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="mb-4">
      <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#ffd56b] font-bold uppercase">{label}</p>
      <p className="mt-1 font-serif text-base text-[#f4e2b3]">{value}</p>
    </div>
  )
}
