import { motion } from 'framer-motion'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function CoupleStory() {
  const { lang, t } = useLanguage()
  const { story } = weddingData

  if (!story || !story.milestones || story.milestones.length === 0) return null

  return (
    <SectionShell
      id="story"
      badge={t('அன்புப் பயணம்', 'Our Journey')}
      title={t(story.titleTamil, story.titleEnglish)}
      subtitle={t(story.subtitleTamil, story.subtitleEnglish)}
      glyph="🌿"
      tone="cream"
    >
      <div className="mx-auto mt-6 max-w-xl">
        <ol className="relative border-l-2 border-[#dfb557]/60 pl-6 space-y-8">
          {story.milestones.map((m, i) => (
            <motion.li
              key={i}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Golden Kalasam/Diya dot on timeline */}
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#dfb557] bg-[#740a18] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffe682]" />
              </span>

              <div className="rounded-2xl border border-[#dfb557]/45 bg-[#ffffff] p-5 shadow-sm">
                <h3 className="font-tamil text-lg font-bold text-[#740a18]">
                  {t(m.titleTamil, m.titleEnglish)}
                </h3>
                <p className="mt-2 font-tamil text-sm leading-relaxed text-[#5c3622]">
                  {t(m.textTamil, m.textEnglish)}
                </p>
                {m.image ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#dfb557]/40 shadow-sm aspect-video">
                    <img
                      src={m.image}
                      alt={t(m.titleTamil, m.titleEnglish)}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
