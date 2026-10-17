import { useLanguage } from '../../../context/LanguageContext'
import weddingData from './data/weddingData'
import TempleGopuramHeader from './TempleGopuramHeader'
import TempleLamp from './TempleLamp'
import LanguageSwitchButton from './LanguageSwitchButton'

export default function OpeningScreen({ onOpen }) {
  const { lang, t } = useLanguage()
  const { opening, couple, hero, invocation, events } = weddingData
  const w = events.wedding

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto px-4 py-6 temple-void-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Temple Wedding Invitation Opening"
    >
      {/* Background radial gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(223,181,87,0.22),transparent_65%)]" />

      {/* Top right language toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitchButton />
      </div>

      <div className="relative w-full max-w-[430px] my-auto animate-[fadeIn_0.8s_ease-out]">
        
        {/* Ornate Temple Card Box */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#dfb557] bg-gradient-to-b from-[#38030b] via-[#240409] to-[#120205] p-1.5 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(223,181,87,0.25)]">
          
          {/* Inner Golden Border */}
          <div className="relative rounded-[1.35rem] border border-[#dfb557]/60 bg-gradient-to-b from-[#4a050e] via-[#2e0409] to-[#170206] px-5 pt-6 pb-8 text-center">
            
            {/* Top Temple Gopuram & Toranam */}
            <TempleGopuramHeader />

            {/* Sacred Divine Invocation */}
            <div className="mt-3 inline-block rounded-full border border-[#dfb557]/60 bg-[#1f0206]/80 px-4 py-1.5">
              <p className="font-tamil text-xs font-bold tracking-wide text-[#ffe682]">
                {t('திருப்பரங்குன்றம் அருள்மிகு சுப்பிரமணிய சுவாமி திருவருள் துணை', 'Divine Blessings of Lord Muruga, Thiruparankundram')}
              </p>
            </div>

            <p className="mt-1.5 font-tamil text-[11px] text-[#edd9b8]/90 font-semibold">
              {t('மங்கலத் திருமண அழைப்பிதழ்', 'Auspicious Wedding Invitation')}
            </p>

            {/* Subha Muhurtham Badge */}
            <div className="my-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#dfb557]" />
              <span className="font-tamil text-xs font-semibold text-[#f8eed6] uppercase tracking-wider">
                {t(opening.headerTamil, opening.headerEnglish)}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#dfb557]" />
            </div>

            {/* Couple Names Section with Flanking Kuthuvilakku Lamps */}
            <div className="relative my-2 py-4 border-y border-[#dfb557]/30 bg-[#280308]/60 rounded-xl px-2">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden sm:block">
                <TempleLamp size="sm" />
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:block">
                <TempleLamp size="sm" />
              </div>

              <p className="font-tamil text-xs font-semibold text-[#ffe682]/90">
                {t('மணமக்கள்', 'The Couple')}
              </p>

              {/* Tamil Names */}
              <h1 className="mt-2 font-tamil text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe682] via-[#dfb557] to-[#ffe682] leading-tight">
                {t(couple.brideNameTamil, couple.brideName)}
              </h1>
              
              <div className="my-1.5 flex items-center justify-center gap-3">
                <span className="h-px w-6 bg-[#dfb557]/60" />
                <span className="font-serif text-lg font-bold italic text-[#ffe682]">
                  {t('இணை', 'wずds')}
                </span>
                <span className="h-px w-6 bg-[#dfb557]/60" />
              </div>

              <h1 className="font-tamil text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe682] via-[#dfb557] to-[#ffe682] leading-tight">
                {t(couple.groomNameTamil, couple.groomName)}
              </h1>

              {/* Subtitle in other language */}
              <p className="mt-2 font-serif text-sm tracking-wider text-[#edd9b8]/80">
                {couple.brideName} &amp; {couple.groomName}
              </p>
            </div>

            {/* Muhurtham Date & Venue */}
            <div className="mt-4 space-y-1 text-center">
              <p className="font-tamil text-xs font-bold text-[#dfb557]">
                🛕 {t('திருப்பரங்குன்றம் கோவில் திருமணம்', 'Thiruparankundram Temple Wedding')}
              </p>
              <p className="font-tamil text-sm font-bold text-[#fffdf9]">
                {t(hero.weddingDateLabelTamil, hero.weddingDateLabelEnglish)}
              </p>
              <p className="font-tamil text-xs text-[#ffe682]">
                {t(w.timeDisplayTamil, w.timeDisplayEnglish)}
              </p>
              <p className="font-tamil text-xs text-[#edd9b8]/85">
                {t(w.venueTamil, w.venueEnglish)}, {t(w.addressTamil, w.addressEnglish)}
              </p>
            </div>

            {/* Glowing Sacred Diya Opening Button */}
            <div className="mt-7 flex flex-col items-center">
              <button
                id="open-temple-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onOpen()
                }}
                className="group relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#ffe682] bg-gradient-to-br from-[#dfb557] via-[#b38222] to-[#740a18] text-[#fffdf9] shadow-[0_0_30px_rgba(223,181,87,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={t(opening.buttonLabelTamil, opening.buttonLabelEnglish)}
              >
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-full border border-[#ffe682] animate-ping opacity-35" />
                
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl filter drop-shadow">🪔</span>
                  <span className="font-tamil text-[11px] font-black tracking-wider text-[#fffdf9] mt-0.5">
                    {t('திறக்க', 'OPEN')}
                  </span>
                </div>
              </button>

              <p className="mt-3.5 font-tamil text-xs font-semibold text-[#ffe682] animate-pulse">
                {t(opening.tapHintTamil, opening.tapHintEnglish)}
              </p>
              <p className="mt-1 font-tamil text-[10px] text-[#edd9b8]/60">
                {t('மங்கல நாதஸ்வர இன்னிசையுடன் மலரும்', 'Experience with Auspicious Wedding Music')}
              </p>
            </div>

          </div>
        </div>

        {/* Footer auspicious line */}
        <p className="mt-4 text-center font-tamil text-xs text-[#edd9b8]/75">
          {t('இரு மனங்கள் · ஒரு வாழ்க்கை · சுபமஸ்து', 'Two Hearts · One Journey · Subham')}
        </p>
      </div>
    </div>
  )
}
