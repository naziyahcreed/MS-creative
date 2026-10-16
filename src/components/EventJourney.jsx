import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { buildGoogleCalendarUrl } from '../utils/calendar'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners } from './Ornaments'
import { Ico } from './Icons'

export default function EventJourney() {
  const { t } = useLanguage()
  const events = [weddingData.events.engagement, weddingData.events.wedding, weddingData.events.reception]
  const names = `${weddingData.couple.brideName} & ${weddingData.couple.groomName}`

  return (
    <section id="events" className="px-4 py-10">
      <Reveal>
        <SectionTitle title={t('நிகழ்வுப் பயணம்', 'Event Journey')} />
      </Reveal>
      <div className="relative">
        <div className="absolute bottom-6 left-[15px] top-4 w-px bg-gradient-to-b from-[#c4a35a] to-[#e8d5a3]" />
        {events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.08} className="relative mb-4 pl-10">
            <span className="absolute left-[6px] top-7 z-10 h-4 w-4 rounded-full border-4 border-[#f7f0e1] bg-[#c4a35a]" />
            <article className="gold-card rounded-2xl p-4">
              <GoldCorners />
              <p className="font-cinzel text-[10px] tracking-[0.22em] text-[#ffd56b] font-bold uppercase">
                {t(ev.titleTamil, ev.title)}
              </p>
              <h3 className="mt-1 font-serif text-[clamp(1rem,4.5vw,1.18rem)] font-bold leading-snug break-words text-[#f4e2b3]">
                {t(ev.displayDateTamil, ev.displayDateEnglish)}
              </h3>
              <p className="mt-1 text-xs leading-snug text-[#e8d5a3] font-medium">
                {t(ev.timeDisplayTamil, ev.timeDisplayEnglish)} · {t(ev.venueTamil, ev.venueEnglish)}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-[#d9c7a6]">{t(ev.addressTamil, ev.addressEnglish)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={buildGoogleCalendarUrl(ev, names)}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                >
                  <Ico.cal className="h-3.5 w-3.5" /> {t('நாள்காட்டி', 'Add to Calendar')}
                </a>
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                >
                  <Ico.pin className="h-3.5 w-3.5" /> {t('வழி', 'Get Directions')}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
