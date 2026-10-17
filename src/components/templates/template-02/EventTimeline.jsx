import { motion } from 'framer-motion'
import { buildGoogleCalendarUrl, downloadICS } from '../../../utils/calendar'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

function DetailRow({ icon, primary, secondary }) {
  return (
    <div className="detail-row">
      <span className="row-icon" aria-hidden>{icon}</span>
      <div>
        <p className="row-text-primary font-tamil">{primary}</p>
        {secondary ? <p className="row-text-sub font-tamil">{secondary}</p> : null}
      </div>
    </div>
  )
}

function EventCard({ event, coupleNames, index }) {
  const { lang, t } = useLanguage()
  const primary = event.primary

  return (
    <motion.article
      className={`ceremony-item-card ${primary ? 'featured-card' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="ceremony-accent-line" aria-hidden />

      <div className="ceremony-body">
        {/* Top Tag and Emoji */}
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full bg-[#740a18]/10 border border-[#dfb557]/60 px-3 py-1 font-tamil text-xs font-bold text-[#740a18]">
            {t(event.ceremonyTagTamil, event.ceremonyTagEnglish)}
          </span>
          <span className="text-2xl" aria-hidden>{event.decorEmoji}</span>
        </div>

        {/* Title */}
        <h3 className="ceremony-name font-tamil">
          {t(event.titleTamil, event.title)}
        </h3>

        {/* Subtitle in other language */}
        <p className="font-serif text-sm font-semibold text-[#91681e] tracking-wide">
          {lang === 'ta' ? event.title : event.titleTamil}
        </p>

        {/* Description */}
        <p className="ceremony-subquote font-tamil">
          {t(event.descriptionTamil, event.descriptionEnglish)}
        </p>

        {/* Details Box */}
        <div className={`ceremony-details-box ${primary ? 'featured-details' : ''}`}>
          <DetailRow
            icon="📅"
            primary={t(event.displayDateTamil, event.displayDateEnglish)}
          />
          <DetailRow
            icon="⏰"
            primary={t(event.timeDisplayTamil, event.timeDisplayEnglish)}
          />
          <DetailRow
            icon="🏛️"
            primary={t(event.venueTamil, event.venueEnglish)}
            secondary={`${t(event.addressTamil, event.addressEnglish)}${event.landmarkTamil ? ` (${t(event.landmarkTamil, event.landmarkEnglish)})` : ''}`}
          />
        </div>

        {/* Traditional Feast Note */}
        {event.followNoteTamil ? (
          <div className="mt-3.5 flex items-center justify-center gap-2 rounded-lg bg-[#faf4e6] py-1.5 px-3 border border-[#dfb557]/40">
            <span>🍌</span>
            <p className="font-tamil text-xs font-bold text-[#740a18]">
              {t(event.followNoteTamil, event.followNoteEnglish)}
            </p>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="ceremony-actions-row">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-map text-xs"
          >
            <span>📍 {t('கூகுள் மேப் வழிகாட்டி', 'Google Maps')}</span>
            <span aria-hidden>&rarr;</span>
          </a>
          <a
            href={buildGoogleCalendarUrl(event, coupleNames)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-cal text-xs"
          >
            <span>📅 {t('+ கேலெண்டரில் சேர்க்க', '+ Add to Calendar')}</span>
          </a>
          <button
            type="button"
            onClick={() => downloadICS(event, coupleNames)}
            className="text-xs font-bold text-[#91681e] hover:underline px-2 py-1"
          >
            {t('நினைவூட்டல் (.ics)', 'Reminder (.ics)')}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function EventTimeline() {
  const { lang, t } = useLanguage()
  const { events, couple } = weddingData
  const coupleNames = `${couple.brideName} & ${couple.groomName}`
  const ordered = [events.engagement, events.wedding, events.reception]

  return (
    <SectionShell
      id="events"
      badge={t('சுப நிகழ்வுகள்', 'Auspicious Events')}
      title={t('திருமண வைபவ நிகழ்ச்சி நிரல்', 'Wedding Ceremonies & Itinerary')}
      subtitle={t('நிச்சயதார்த்தம் • திருக்கல்யாணம் • திருமண வரவேற்பு', 'Engagement • Temple Muhurtham • Grand Reception')}
      glyph="🛕"
      tone="white"
    >
      <div className="mx-auto mt-6 max-w-xl">
        {ordered.map((event, i) => (
          <EventCard key={event.id} event={event} coupleNames={coupleNames} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}
