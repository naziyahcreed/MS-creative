import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { GoldCorners, Lotus } from './Ornaments'

export default function FamilyBlessings() {
  const { t } = useLanguage()
  const { family } = weddingData

  return (
    <section className="px-4 py-10">
      <Reveal>
        <SectionTitle title={t(family.titleTamil, family.titleEnglish)} />
      </Reveal>
      <div className="space-y-4">
        {[family.bride, family.groom].map((side, i) => (
          <Reveal key={side.labelEnglish} delay={i * 0.1}>
            <article className="gold-card rounded-[24px] px-5 py-7 text-center">
              <GoldCorners />
              <h3 className="font-cinzel text-sm font-bold tracking-[0.15em] text-[#ffd56b] uppercase break-words">
                {t(side.labelTamil, side.labelEnglish)}
              </h3>
              <p className="mt-3 font-serif text-[1.08rem] leading-relaxed break-words text-[#f7f0e1] italic">
                “{t(side.messageTamil, side.messageEnglish)}”
              </p>
              <div className="mt-4 flex justify-center">
                <Lotus className="h-10 w-10 text-[#c4a35a]" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
