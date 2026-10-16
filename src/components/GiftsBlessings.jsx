import { useEffect, useState } from 'react'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import { GoldCorners, Lotus } from './Ornaments'

const KEY = 'nivi-weds-blessings'

export default function GiftsBlessings() {
  const { t } = useLanguage()
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    try {
      setList(JSON.parse(localStorage.getItem(KEY) || '[]'))
    } catch {
      setList([])
    }
  }, [])

  const post = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const next = [{ id: Date.now(), text: text.trim() }, ...list].slice(0, 40)
    setList(next)
    localStorage.setItem(KEY, JSON.stringify(next))
    setText('')
  }

  return (
    <section className="space-y-4 px-4 py-10">
      <Reveal>
        <div className="gold-card rounded-[24px] p-6 text-center">
          <GoldCorners />
          <p className="font-cinzel text-sm font-bold tracking-[0.16em] text-[#ffd56b] uppercase">
            {t(weddingData.gifts.subTamil, weddingData.gifts.subEnglish)}
          </p>
          <Lotus className="mx-auto mt-3 h-12 w-12 text-[#c4a35a]" />
          <p className="mt-3 font-serif text-xl font-bold text-[#f4e2b3]">
            {t(weddingData.gifts.headingTamil, weddingData.gifts.headingEnglish)}
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="gold-card rounded-[24px] p-6">
          <GoldCorners />
          <h3 className="font-cinzel text-sm font-bold tracking-[0.14em] text-[#ffd56b] uppercase">
            {t('வாழ்த்து எழுதுக', 'Leave a Blessing')}
          </h3>
          <p className="mt-1 text-xs text-[#e8d5a3]">{t('உங்கள் அன்பு வார்த்தைகள்', 'Your kind words mean a lot')}</p>
          <form onSubmit={post} className="mt-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder={t('வாழ்த்தை எழுதுங்கள்...', 'Write your blessing...')}
              className="w-full rounded-xl border border-[#c4a35a]/50 bg-[#1c0f0a]/80 px-3.5 py-2.5 text-sm text-[#f4e2b3] placeholder:text-[#a8927a] focus:outline-none focus:border-[#ffd56b]"
            />
            <button type="submit" className="gold-btn mt-3 rounded-full px-5 py-2 text-xs font-semibold cursor-pointer">
              {t('அனுப்பு', 'Post')}
            </button>
          </form>
          <div className="mt-4 max-h-32 space-y-2 overflow-auto">
            {list.map((b) => (
              <p key={b.id} className="rounded-xl border border-[#c4a35a]/30 bg-[#1c0f0a]/70 px-3.5 py-2 text-sm italic text-[#f4e2b3]">
                “{b.text}”
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
