import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'

export default function ThankYou() {
  const { t } = useLanguage()
  const { couple, final } = weddingData

  return (
    <section
      id="thanks"
      className="relative min-h-[78vh] overflow-hidden px-5 py-16 text-center text-[#f8efdc]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(26,16,10,.45), rgba(26,16,10,.62)), url('/images/thankyou-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="font-script text-5xl text-[#f4e2b3]">{t(final.tamil, final.english)}</p>
      <p className="mt-3 font-serif text-lg italic">{t(final.subTamil, final.subEnglish)}</p>
      <h2 className="mt-8 font-cinzel text-3xl tracking-[0.14em]">
        {couple.brideName.toUpperCase()}
        <span className="block font-script text-4xl tracking-normal text-[#f4e2b3]">&</span>
        {couple.groomName.toUpperCase()}
      </h2>
      <p className="mt-4 text-sm tracking-wide text-[#e8d5a3]">{t(final.signOffTamil, final.signOffEnglish)}</p>
      <a href="#home" className="gold-btn mt-8 inline-block rounded-full px-6 py-2 text-xs tracking-widest uppercase">
        {t('மேலே செல்', 'Back to top')}
      </a>
    </section>
  )
}
