import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle({ dark = false }) {
  const { lang, toggleLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wider ${
        dark
          ? 'border-[#e9bfe2]/30 bg-[#3b0f38]/90 text-[#f4e2b3] hover:bg-[#45143d] hover:border-[#e9bfe2]/60 shadow-[0_2px_8px_rgba(69,20,61,0.4)] backdrop-blur-md'
          : 'border-[#c4a35a] text-[#6b4b28] bg-white/70 hover:bg-[#c4a35a] hover:text-white'
      }`}
      aria-label="Toggle language"
    >
      {lang === 'en' ? 'தமிழ்' : 'EN'}
    </button>
  )
}
