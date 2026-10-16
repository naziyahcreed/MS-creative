import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'

export default function MapsSection() {
  const { t } = useLanguage()

  return (
    <section id="maps" className="px-4 py-10">
      <Reveal>
        <SectionTitle title={t('வரைபடம்', 'Maps')} sub={t('ஒவ்வொரு இடத்துக்கும் தனி வரைபடம்', 'A separate map for each venue')} />
      </Reveal>
      <div className="space-y-5">
        {weddingData.venues.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.08}>
            <article className="gold-card overflow-hidden rounded-[24px]">
              <GoldCorners />
              <div className="flex items-center justify-between px-4 pb-2 pt-4">
                <div>
                  <p className="font-cinzel text-[10px] tracking-[0.16em] text-[#ffd56b] font-bold uppercase">
                    {t(v.eventsTamil, v.eventsEnglish)}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#f4e2b3]">{t(v.nameTamil, v.nameEnglish)}</h3>
                </div>
                <a
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                >
                  <Ico.pin className="h-3.5 w-3.5" /> {t('திற', 'Open')}
                </a>
              </div>
              <div className="overflow-hidden">
                <iframe
                  title={v.nameEnglish}
                  src={v.mapsEmbed}
                  className="h-[220px] w-full max-w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
