import weddingData from './data/weddingData'
import TempleLamp from './TempleLamp'
import { useLanguage } from '../../../context/LanguageContext'

export default function FinalThankYou() {
  const { lang, t } = useLanguage()
  const { final, couple } = weddingData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-8 px-4 pt-12 pb-24 text-center md:px-8 bg-[#faf4e6] border-t-2 border-[#dfb557]">
      
      {/* Twin Kuthuvilakku */}
      <div className="flex justify-center items-center gap-8 mb-5">
        <TempleLamp size="sm" />
        <div className="text-3xl filter drop-shadow">🛕</div>
        <TempleLamp size="sm" />
      </div>

      <h2 className="font-tamil text-3xl sm:text-4xl font-black text-[#740a18]">
        {t(final.tamil, final.english)}
      </h2>

      <p className="mx-auto mt-3 max-w-md font-tamil text-sm sm:text-base leading-relaxed text-[#5c3622] font-semibold">
        {t(final.subTamil, final.subEnglish)}
      </p>

      <div className="my-6 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-[#dfb557]" />
        <span className="font-serif text-lg font-bold text-[#b38222]">{couple.hashtag}</span>
        <span className="h-px w-16 bg-[#dfb557]" />
      </div>

      <p className="whitespace-pre-line font-tamil text-sm font-bold text-[#740a18]">
        {t(final.signOffTamil, final.signOffEnglish)}
      </p>

      <button
        type="button"
        onClick={scrollToTop}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#dfb557] bg-[#ffffff] px-5 py-2 font-tamil text-xs font-bold text-[#740a18] shadow-sm hover:bg-[#dfb557]/20 transition active:scale-95"
      >
        <span>{t(final.backLabelTamil, final.backLabelEnglish)}</span>
        <span>&uarr;</span>
      </button>

      {/* Bottom Zari saree border */}
      <div className="zari-border-bottom -mx-4 md:-mx-8 mt-12" />
    </footer>
  )
}
