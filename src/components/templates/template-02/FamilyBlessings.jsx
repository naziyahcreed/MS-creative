import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

function FamilyPanel({ side }) {
  const { lang, t } = useLanguage()

  return (
    <article className="rounded-2xl border-2 border-[#dfb557]/45 bg-[#ffffff] p-6 shadow-sm transition hover:border-[#dfb557]">
      <div className="flex items-center gap-2">
        <span className="text-xl">🙏</span>
        <h3 className="font-tamil text-lg font-bold text-[#740a18]">
          {t(side.labelTamil, side.labelEnglish)}
        </h3>
      </div>
      <p className="mt-3 font-tamil text-sm leading-relaxed text-[#5c3622]">
        {t(side.messageTamil, side.messageEnglish)}
      </p>
    </article>
  )
}

export default function FamilyBlessings() {
  const { lang, t } = useLanguage()
  const { family } = weddingData

  return (
    <SectionShell
      id="family"
      badge={t('குடும்ப ஆசி', 'Family Blessings')}
      title={t(family.titleTamil, family.titleEnglish)}
      subtitle={t('பெற்றோர் & பெரியோர்களின் நல்லாசிகளுடன்', 'With the warm blessings of parents and elders')}
      glyph="🙏"
      tone="white"
    >
      <div className="mx-auto mt-6 grid max-w-xl gap-5">
        <FamilyPanel side={family.bride} />
        <FamilyPanel side={family.groom} />
      </div>
    </SectionShell>
  )
}
