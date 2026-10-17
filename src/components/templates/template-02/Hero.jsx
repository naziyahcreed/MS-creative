import { motion } from 'framer-motion'
import weddingData from './data/weddingData'
import TempleGopuramHeader from './TempleGopuramHeader'
import TempleLamp from './TempleLamp'
import { useLanguage } from '../../../context/LanguageContext'

export default function Hero({ weddingDayState }) {
  const { lang, t } = useLanguage()
  const { couple, hero, events, invocation, shloka } = weddingData
  const w = events.wedding

  return (
    <section id="home" className="relative overflow-hidden px-4 pt-4 pb-14 text-center md:px-8">
      
      {/* Top Zari border */}
      <div className="zari-border-top -mx-4 md:-mx-8 mb-6" />

      {/* Temple Gopuram & Toranam Arch */}
      <TempleGopuramHeader className="mb-4" />

      {/* Divine Invocation Tag */}
      <div className="inline-block rounded-full border border-[#dfb557] bg-[#740a18] px-5 py-1.5 shadow-[0_3px_10px_rgba(116,10,24,0.25)]">
        <p className="font-tamil text-xs font-bold text-[#ffe682]">
          {t('மங்கலத் திருமண அழைப்பிதழ்', 'Royal Wedding Invitation')}
        </p>
      </div>

      <p className="mt-2 font-tamil text-xs text-[#740a18] font-bold">
        {t('திருப்பரங்குன்றம் அருள்மிகு சுப்பிரமணிய சுவாமி திருவருள் துணை', 'With the Divine Grace of Lord Muruga, Thiruparankundram')}
      </p>

      {/* Mangalya Dharana Sacred Shloka Box */}
      <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-[#dfb557]/60 bg-[#fffcf5] p-3.5 shadow-sm">
        <p className="font-serif text-xs md:text-sm font-semibold tracking-wide text-[#740a18] italic">
          &ldquo;{shloka.tamil}&rdquo;
        </p>
        <p className="mt-1 font-tamil text-[11px] text-[#755243]">
          {t(shloka.meaningTamil, shloka.meaningEnglish)}
        </p>
      </div>

      {/* Main Couple Names Section with Flanking Kuthuvilakku */}
      <div className="relative mx-auto mt-6 max-w-xl py-6">
        {/* Left Kuthuvilakku */}
        <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2">
          <TempleLamp size="md" />
        </div>

        {/* Right Kuthuvilakku */}
        <div className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2">
          <TempleLamp size="md" />
        </div>

        {/* Center content */}
        <div className="px-14 sm:px-20">
          <p className="font-tamil text-xs uppercase tracking-widest text-[#91681e] font-bold">
            {t('சுபமுகூர்த்தத் திருமண அழைப்பிதழ்', 'Royal Wedding Invitation')}
          </p>

          <p className="mt-1 font-tamil text-xs text-[#755243]">
            {t(hero.blessingTamil, hero.blessingEnglish)}
          </p>

          {/* Bride Name */}
          <h1 className="mt-4 font-tamil text-3xl sm:text-4xl md:text-5xl font-black text-[#740a18] leading-tight">
            {t(couple.brideNameTamil, couple.brideName)}
          </h1>

          {/* Auspicious Weds Glyph */}
          <div className="my-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#dfb557]" />
            <span className="font-serif text-xl sm:text-2xl font-bold italic text-[#dfb557]">
              {t('இணை', '&')}
            </span>
            <span className="h-px w-10 bg-[#dfb557]" />
          </div>

          {/* Groom Name */}
          <h1 className="font-tamil text-3xl sm:text-4xl md:text-5xl font-black text-[#740a18] leading-tight">
            {t(couple.groomNameTamil, couple.groomName)}
          </h1>

          <p className="mt-3 font-serif text-base sm:text-lg tracking-wider text-[#91681e] font-bold">
            {couple.brideName} &amp; {couple.groomName}
          </p>
        </div>
      </div>

      {/* Temple Location Pill */}
      <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[#dfb557] bg-[#faf4e6] px-5 py-2 text-xs font-bold text-[#740a18] shadow-sm">
        <span>🛕</span>
        <span className="font-tamil">{t(hero.kovilNoteTamil, hero.kovilNoteEnglish)}</span>
      </div>

      {/* Auspicious Wedding Muhurtham Card */}
      <div className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-[#dfb557] bg-gradient-to-b from-[#ffffff] to-[#fffbf2] p-5 shadow-[0_8px_25px_rgba(116,10,24,0.08)]">
        <span className="inline-block rounded-full bg-[#740a18] px-3.5 py-1 font-tamil text-xs font-bold text-[#ffe682]">
          {t('புனித முகூர்த்த நாள் & நேரம்', 'Auspicious Muhurtham Day & Time')}
        </span>
        
        <h2 className="mt-3 font-tamil text-lg sm:text-xl font-black text-[#740a18]">
          {t(hero.weddingDateLabelTamil, hero.weddingDateLabelEnglish)}
        </h2>
        
        <p className="mt-1 font-tamil text-sm font-bold text-[#b38222]">
          {t(hero.muhurthamTimeTamil, hero.muhurthamTimeEnglish)}
        </p>

        <p className="mt-2 font-tamil text-xs text-[#5c3622]">
          {t(w.venueTamil, w.venueEnglish)} • {t(w.addressTamil, w.addressEnglish)}
        </p>

        {/* Action button */}
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <a
            href={w.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-map text-xs"
          >
            <span>📍 {t('கூகுள் மேப் வழிகாட்டி', 'View on Google Maps')}</span>
          </a>
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Muhurtham+of+Niveditha+%26+Natraj&dates=20261025T010000Z/20261025T060000Z&details=Auspicious+Muhurtham+at+Vasantham+Mahal%2C+Madurai.&location=Vasantham+Mahal%2C+Thiruparankundram%2C+Madurai`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-cal text-xs"
          >
            <span>📅 {t('கேலெண்டரில் சேர்க்க', '+ Add to Calendar')}</span>
          </a>
        </div>
      </div>

      {/* Couple Portrait Image with Traditional Arch Frame */}
      <div className="relative mx-auto mt-8 max-w-[320px]">
        {/* Decorative Arch Frame */}
        <div className="overflow-hidden rounded-t-[5rem] rounded-b-2xl border-4 border-[#dfb557] bg-[#740a18] p-1.5 shadow-[0_15px_35px_rgba(116,10,24,0.25)]">
          <div className="relative overflow-hidden rounded-t-[4.75rem] rounded-b-xl">
            <img
              src={couple.heroPortrait}
              alt={couple.heroPortraitAlt}
              className="aspect-[3/4] w-full object-cover object-top filter contrast-[1.02]"
              loading="eager"
            />
            {/* Soft gradient bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#740a18]/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 inset-x-0 text-center px-2">
              <p className="font-tamil text-sm font-bold text-[#ffe682] filter drop-shadow">
                {t('செல்வி. நிவேதிதா & செல்வன். நடராஜ்', 'Niveditha & Natraj')}
              </p>
              <p className="font-tamil text-[10px] text-[#fffdf9]/90">
                {t('அன்புடன் தொடங்கும் புதிய வாழ்க்கை', 'Together Forever in Love')}
              </p>
            </div>
          </div>
        </div>

        {/* Small floating flower garland badge below portrait */}
        <div className="mt-3 flex justify-center items-center gap-2 text-sm text-[#b38222]">
          <span>🌸</span>
          <span className="font-tamil text-xs font-semibold text-[#740a18]">
            {t('மங்கல நாதஸ்வரம் முழங்க...', 'Solemnized with Vedic Chants & Nadaswaram')}
          </span>
          <span>🌸</span>
        </div>
      </div>

    </section>
  )
}
