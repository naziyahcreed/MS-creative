import { motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'
import { MangoLeaves } from './Ornaments'

export default function Hero() {
  const { t } = useLanguage()
  const { couple, hero, events } = weddingData
  const w = events.wedding

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Couple Photo */}
      <img
        src="/images/hero-couple.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f7f0e1]/82 via-[#f7f0e1]/35 to-transparent" />
      <MangoLeaves className="absolute left-0 right-0 top-0 z-10" />

      <div className="relative z-20 flex min-h-[100dvh] flex-col items-center px-5 pb-28 pt-[calc(4.75rem+env(safe-area-inset-top))] text-center">
        
        {/* Blessing Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-[20rem] font-serif text-sm italic leading-snug text-[#6b4b28]"
        >
          {t(hero.blessingTamil, hero.blessingEnglish)}
        </motion.p>

        {/* Original Couple Names as Requested */}
        <h1 className="mt-3 font-cinzel text-[clamp(1.7rem,8vw,2.4rem)] font-semibold leading-none tracking-[0.06em] text-[#3d2918]">
          {couple.brideName.toUpperCase()}
        </h1>
        <p className="font-script text-[clamp(2rem,10vw,2.5rem)] leading-none text-[#c4a35a]">&</p>
        <h1 className="font-cinzel text-[clamp(1.7rem,8vw,2.4rem)] font-semibold leading-none tracking-[0.06em] text-[#3d2918]">
          {couple.groomName.toUpperCase()}
        </h1>

        <p className="mt-4 font-serif text-base italic text-[#6b4b28]">
          {t(hero.lineTamil, hero.lineEnglish)}
        </p>

        {/* ============================================================== */}
        {/* DATE JEWEL BOX: Styled like Opening Page with Golden Animation  */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{
            opacity: 1,
            scale: [0.92, 1.04, 1],
            y: 0,
          }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[56%] z-20 w-[min(82vw,310px)] -translate-x-1/2"
        >
          {/* Ambient Golden Radial Halo Glow */}
          <div className="gold-aura-halo absolute -inset-4 rounded-full pointer-events-none opacity-40" />

          {/* Golden Animated Running Border Box */}
          <div className="gold-running-border p-[1.5px] rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_24px_rgba(255,213,107,0.3)]">
  <div className="relative rounded-[14px] bg-black/75 backdrop-blur-md px-6 py-3.5 overflow-hidden text-center">

    {/* Corner Ornaments */}
    <span className="absolute top-1.5 left-2 text-[#ffd56b] text-[9px] pointer-events-none select-none">❖</span>
    <span className="absolute top-1.5 right-2 text-[#ffd56b] text-[9px] pointer-events-none select-none">❖</span>
    <span className="absolute bottom-1.5 left-2 text-[#ffd56b] text-[9px] pointer-events-none select-none">❖</span>
    <span className="absolute bottom-1.5 right-2 text-[#ffd56b] text-[9px] pointer-events-none select-none">❖</span>

    {/* Inner Hairline Frame */}
    <div className="pointer-events-none absolute inset-1 rounded-xl border border-[#ffd56b]/20" />

    {/* Periodic Sweeping Golden Light Sheen */}
    <div className="gold-light-sheen" />

    {/* Header with Sparkles */}
    <div className="flex items-center justify-center gap-1.5 text-[#ffd56b]">
      <span className="text-[10px] gold-sparkle">✨</span>
      <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.25em] text-[#f4e2b3]">
        {t(w.displayDateTamil, w.displayDateEnglish).split(',')[0].toUpperCase()}
      </p>
      <span className="text-[10px] gold-sparkle" style={{ animationDelay: '0.6s' }}>✨</span>
    </div>

    {/* Date in Royal Liquid Gold */}
    <p className="relative top-1 font-cinzel text-2xl font-black tracking-[0.14em] royal-gold-text my-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
      25 OCT 2026
    </p>

    {/* Time Display */}
    <div className="flex items-center justify-center gap-2 mt-1 text-[#e8d5a3]">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#ffd56b]/50" />
      <p className="text-xs font-semibold tracking-wider text-[#f4e2b3] drop-shadow">
        {t(w.timeDisplayTamil, w.timeDisplayEnglish)}
      </p>
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#ffd56b]/50" />
    </div>

  </div>
</div>
        </motion.div>

      </div>
    </section>
  )
}
