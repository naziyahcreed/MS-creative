import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext({
  lang: 'en',
  toggleLang: () => {},
  setLang: () => {},
  t: (ta, en) => en ?? ta,
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ta' : 'en'))
  const t = (ta, en) => (lang === 'en' ? (en ?? ta) : ta)

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
