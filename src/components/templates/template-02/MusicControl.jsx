import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import weddingData from './data/weddingData'
import { useLanguage } from '../../../context/LanguageContext'

const MusicControl = forwardRef(function MusicControl(_, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const { lang, t } = useLanguage()

  useImperativeHandle(ref, () => ({
    async start() {
      const audio = audioRef.current
      if (!audio) return
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        /* audio autoplay restrictions */
      }
    },
  }))

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={weddingData.music.src} loop preload="auto" />
      <div className="fixed bottom-[4.25rem] right-3 z-50 flex items-center md:bottom-6 md:right-[max(1rem,calc(50%-310px))]">
        <button
          type="button"
          onClick={togglePlay}
          className={`group relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#dfb557] bg-[#740a18] text-[#ffe682] shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all hover:scale-105 active:scale-95 ${
            playing ? 'animate-[spin_6s_linear_infinite]' : ''
          }`}
          title={t(weddingData.music.labelTamil, weddingData.music.labelEnglish)}
          aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
        >
          <span className="text-lg">🎺</span>
          
          {/* Audio waves when playing */}
          {playing && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffe682] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dfb557]" />
            </span>
          )}
        </button>
      </div>
    </>
  )
})

export default MusicControl
