import { useState } from 'react'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { Ico } from './Icons'
import LanguageToggle from './LanguageToggle'
import BrandHeader from './BrandHeader'

export default function MobileNav({ active, musicOn, onMusic }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="invite-chrome top-0 z-50 flex items-center justify-between px-3 pb-2 pt-[max(10px,env(safe-area-inset-top))]">
        <a href="#home" className="inline-block transition-transform hover:scale-[1.02]">
          <BrandHeader compact />
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle dark />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-[#e9bfe2]/30 bg-[#3b0f38]/90 p-2 text-[#f4e2b3] shadow-[0_2px_10px_rgba(69,20,61,0.4)] backdrop-blur-md hover:bg-[#45143d] transition-all cursor-pointer"
            aria-label="Menu"
          >
            {open ? <Ico.close className="h-5 w-5" /> : <Ico.menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div
          className="invite-chrome inset-y-0 z-40 bg-[#140613]/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-3 top-[calc(3.5rem+env(safe-area-inset-top))] w-[min(15rem,calc(100%-1.5rem))] rounded-3xl border border-[#e9bfe2]/30 bg-gradient-to-b from-[#3b0f38]/98 via-[#2d0a2b]/98 to-[#1e071c]/98 p-3.5 text-[#f4e2b3] shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 pb-2.5 border-b border-[#e9bfe2]/20 flex items-center justify-center">
              <BrandHeader compact />
            </div>
            {weddingData.nav.map((item) => {
              const Icon = Ico[item.icon]
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active === item.id ? 'bg-[#e9bfe2]/20 text-white font-semibold' : 'text-[#f4e2b3] hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#ffd56b]" />
                  {t(item.ta, item.en)}
                </a>
              )
            })}
            <button
              type="button"
              onClick={onMusic}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#f4e2b3] hover:bg-white/10 transition-colors"
            >
              <Ico.music className="h-5 w-5 shrink-0 text-[#ffd56b]" />
              {musicOn ? 'Music On' : 'Music Off'}
            </button>
          </div>
        </div>
      ) : null}

      <nav className="invite-chrome bottom-0 z-50 flex items-stretch justify-around border-t border-[#e9bfe2]/25 bg-gradient-to-r from-[#2c0b2a]/95 via-[#3b0f38]/95 to-[#240822]/95 backdrop-blur-lg px-1 pt-1.5 pb-[max(8px,env(safe-area-inset-bottom))] text-[#d9c7a6]">
        {weddingData.nav.map((item) => {
          const Icon = Ico[item.icon]
          const on = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition-all ${
                on ? 'text-white font-semibold' : 'hover:text-[#f4e2b3]'
              }`}
              aria-label={item.en}
            >
              <span className={`rounded-full p-1.5 transition-all ${on ? 'bg-[#c4a35a] text-[#2c0b2a] shadow-[0_0_12px_rgba(255,213,107,0.5)]' : ''}`}>
                <Icon className="h-5 w-5" />
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
