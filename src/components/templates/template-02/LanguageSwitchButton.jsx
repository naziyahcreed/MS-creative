import { useLanguage } from '../../../context/LanguageContext'

export default function LanguageSwitchButton({ className = '' }) {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`group relative inline-flex items-center gap-1.5 rounded-full border-1.5 border-[#dfb557] bg-[#740a18] px-3.5 py-1.5 text-xs font-bold text-[#ffe682] shadow-[0_2px_8px_rgba(116,10,24,0.35)] transition-all hover:bg-[#580510] active:scale-95 ${className}`}
      title={lang === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாற்றவும்'}
      aria-label="Language Toggle"
    >
      <span className="text-sm">🌐</span>
      <span className={lang === 'ta' ? 'text-[#fffdf9] font-extrabold underline decoration-[#ffe682]' : 'text-[#ffe682]/70'}>
        தமிழ்
      </span>
      <span className="text-[#dfb557]/60">|</span>
      <span className={lang === 'en' ? 'text-[#fffdf9] font-extrabold underline decoration-[#ffe682]' : 'text-[#ffe682]/70'}>
        ENG
      </span>
    </button>
  )
}
