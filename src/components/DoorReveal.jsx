import { motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { useLanguage } from '../context/LanguageContext'

export default function DoorReveal({ active, onComplete }) {
  const { t, lang } = useLanguage()
  const { couple } = weddingData

  if (!active) return null

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-[999] cursor-pointer flex items-center justify-center bg-[#120804]/95 backdrop-blur-md select-none overflow-hidden"
    >
      <motion.div
        className="w-full max-w-[420px] h-[100dvh] relative flex flex-col items-center justify-between px-4 py-5 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.96, 1, 1, 1, 1.02],
        }}
        transition={{
          duration: 3.8,
          times: [0, 0.15, 0.5, 0.82, 1],
          ease: 'easeInOut',
        }}
        onAnimationComplete={onComplete}
      >
        {/* Radiant Warm Golden Radial Background Aura */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-96 w-96 rounded-full bg-radial from-[#ffd56b]/35 via-[#c4a35a]/15 to-transparent blur-3xl animate-pulse" />
        </div>

        {/* Ambient Sparkling Stars */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute top-[12%] left-[10%] text-[#ffd56b] text-base gold-sparkle">✦</span>
          <span className="absolute top-[18%] right-[12%] text-[#ffe8a3] text-lg gold-sparkle" style={{ animationDelay: '0.4s' }}>✨</span>
          <span className="absolute bottom-[16%] left-[12%] text-[#ffd56b] text-base gold-sparkle" style={{ animationDelay: '0.8s' }}>✨</span>
          <span className="absolute bottom-[20%] right-[10%] text-[#ffe8a3] text-sm gold-sparkle" style={{ animationDelay: '1.2s' }}>✦</span>
        </div>

        {/* ======================================================== */}
        {/* TOP WELCOME HEADER                                       */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10 w-full pt-2 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 text-[#ffd56b]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#ffd56b]" />
            <span className="text-[10px] tracking-widest text-[#f4e2b3]">❖ ⚜ ❖</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#ffd56b]" />
          </div>

          <h2 className="mt-1.5 font-tamil text-xl sm:text-2xl font-bold text-[#f4e2b3] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            🙏 {t('அன்புடன் வரவேற்கிறோம்', 'Warm Welcome')} 🙏
          </h2>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.32em] text-[#ffd56b] mt-0.5 drop-shadow">
            {t('இரு மனங்கள் இணையும் நல்வரவு', 'Welcome to Our Celebration')}
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* COUPLE FULL-BODY ANIMATED WELCOME PORTRAIT CARD          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[340px] my-auto"
        >
          {/* Animated Golden Border Wrapper */}
          <div className="gold-running-border p-[2px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(255,213,107,0.35)]">
            <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#24150e] to-[#140a06]">
              
              {/* Ornate Gold Corner Flourishes */}
              <span className="absolute top-2.5 left-2.5 text-[#ffd56b] text-xs z-20 pointer-events-none drop-shadow">❖</span>
              <span className="absolute top-2.5 right-2.5 text-[#ffd56b] text-xs z-20 pointer-events-none drop-shadow">❖</span>
              <span className="absolute bottom-2.5 left-2.5 text-[#ffd56b] text-xs z-20 pointer-events-none drop-shadow">❖</span>
              <span className="absolute bottom-2.5 right-2.5 text-[#ffd56b] text-xs z-20 pointer-events-none drop-shadow">❖</span>

              {/* Inner Hairline Frame */}
              <div className="pointer-events-none absolute inset-2 rounded-2xl border border-[#ffd56b]/30 z-20" />

              {/* Sweeping Light Sheen */}
              <div className="gold-light-sheen z-20" />

              {/* Main Animated Couple Welcome Image (Full Body / Three-Quarter) */}
              <div className="relative w-full aspect-[3/4] max-h-[50vh] sm:max-h-[52vh] overflow-hidden bg-[#1a0f0a]">
                <img
                  src="/images/couple-welcome.jpg"
                  alt={`${couple.groomName} & ${couple.brideName} Welcoming`}
                  loading="eager"
                  className="h-full w-full object-cover object-top"
                />

                {/* Subtle Bottom Vignette Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#140a06] via-[#140a06]/60 to-transparent z-10" />

                {/* Namaste Greetings Overlay at Bottom of Image */}
                <div className="absolute inset-x-0 bottom-2 z-20 flex flex-col items-center text-center px-3">
                  <p className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] royal-gold-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {couple.groomName.toUpperCase()} &amp; {couple.brideName.toUpperCase()}
                  </p>
                  <p className="font-tamil text-xs text-[#f4e2b3] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] mt-0.5">
                    {couple.groomNameTamil} &amp; {couple.brideNameTamil}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* BOTTOM WELCOME MESSAGE & TAP HINT                        */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="relative z-10 w-full pb-2 flex flex-col items-center"
        >
          <div className="rounded-full border border-[#ffd56b]/45 bg-black/75 px-6 py-2 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.7)]">
            <p className="font-serif text-xs sm:text-sm italic text-[#f4e2b3]">
              {t('எங்கள் திருமண நல்வரவை ஏற்று வருகை தருக!', 'With joyous hearts, we welcome you to our wedding!')}
            </p>
          </div>

          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#e8d5a3]/70 drop-shadow">
            {lang === 'ta' ? 'தொடர தட்டவும் • Tap anywhere to continue' : 'Tap anywhere to continue'}
          </p>
        </motion.div>

      </motion.div>
    </div>
  )
}
