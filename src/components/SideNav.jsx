import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { Ico } from './Icons'

export default function SideNav({ active, musicOn, onMusic }) {
  const { t } = useLanguage()

  return (
    <aside className="side-nav pointer-events-auto fixed right-5 top-1/2 z-50 hidden w-[92px] -translate-y-1/2 rounded-[28px] py-5 lg:block">
      <div className="mb-3 flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c4a35a]/20 text-[#f4e2b3]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
          </svg>
        </div>
      </div>
      <nav className="flex flex-col items-center gap-1">
        {weddingData.nav.map((item) => {
          const Icon = Ico[item.icon]
          const on = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex w-full flex-col items-center gap-1 px-2 py-2.5 text-[10px] tracking-wide ${
                on ? 'text-[#f4e2b3]' : 'text-[#d9c7a6]/70 hover:text-[#f4e2b3]'
              }`}
            >
              <span className={`rounded-xl p-2 ${on ? 'bg-[#c4a35a]/25' : 'bg-transparent'}`}>
                <Icon className="h-5 w-5" />
              </span>
              {t(item.ta, item.en)}
            </a>
          )
        })}
        <button
          type="button"
          onClick={onMusic}
          className="mt-2 flex w-full flex-col items-center gap-1 px-2 py-2 text-[10px] text-[#d9c7a6]/80 hover:text-[#f4e2b3]"
        >
          <span className={`rounded-xl p-2 ${musicOn ? 'bg-[#c4a35a]/25 text-[#f4e2b3]' : ''}`}>
            <Ico.music className="h-5 w-5" />
          </span>
          {musicOn ? 'Music On' : 'Music Off'}
        </button>
      </nav>
    </aside>
  )
}
