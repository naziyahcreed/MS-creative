import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { Lotus } from './Ornaments'

export default function OurStory() {
  const { t } = useLanguage()
  const { story } = weddingData

  return (
    <section id="story" className="relative px-4 py-12">
      <Reveal>
        <SectionTitle title={t(story.titleTamil, story.titleEnglish)} sub={t(story.subtitleTamil, story.subtitleEnglish)} />
      </Reveal>
      <div className="relative mt-2 grid grid-cols-4 gap-1">
        <div className="absolute left-4 right-4 top-8 h-px bg-gradient-to-r from-transparent via-[#c4a35a] to-transparent" />
        {story.milestones.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.08} className="relative z-10 min-w-0 text-center">
            {m.heart ? (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ffd56b] bg-gradient-to-b from-[#2e1b12] to-[#1c0f0a] shadow-md">
                <Lotus className="h-7 w-7 text-[#f4e2b3]" />
              </div>
            ) : (
              <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-[#c4a35a]/70 shadow">
                <img src={m.image} alt={m.titleEnglish} className="h-full w-full object-cover" />
              </div>
            )}
            <p className="mt-2 px-0.5 font-cinzel text-[9px] leading-tight tracking-wide break-words text-[#5c3d2e]">
              {t(m.titleTamil, m.titleEnglish)}
            </p>
            <p className="text-[10px] text-[#b8923a]">{m.year}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
