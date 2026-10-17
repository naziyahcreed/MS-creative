import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Countdown from './Countdown'
import CurtainReveal from './CurtainReveal'
import CustomCursor from './CustomCursor'
import EasyViewToggle from './EasyViewToggle'
import EventTimeline from './EventTimeline'
import FamilyBlessings from './FamilyBlessings'
import FinalThankYou from './FinalThankYou'
import Gallery from './Gallery'
import Hero from './Hero'
import InvitationMessage from './InvitationMessage'
import KolamDivider from './KolamDivider'
import LuxuryShell from './LuxuryShell'
import MobileNavigation from './MobileNavigation'
import MobileTopBar from './MobileTopBar'
import MusicControl from './MusicControl'
import OpeningScreen from './OpeningScreen'
import LotusOpeningScreen from '../../opening/LotusOpeningScreen'
import LoveHeartOpeningScreen from '../../opening/LoveHeartOpeningScreen'
import ParticleCanvas from './ParticleCanvas'
import ShareSection from './ShareSection'
import VenueMaps from './VenueMaps'
import WeddingDayBanner from './WeddingDayBanner'
import weddingData, { setTemplate02Data, resetTemplate02Data } from './data/weddingData'
import defaultData from './defaultData'
import { adaptInvitationForTemplate02 } from '../../../utils/invitationAdapter'
import { useReducedMotion } from './hooks/useReducedMotion'
import { getWeddingDayState } from './utils/weddingDay'
import './template-02.css'

export default function Template02({ invitationData }) {
  const [opened, setOpened] = useState(false)
  const [curtain, setCurtain] = useState(false)
  const [openingTheme, setOpeningTheme] = useState('lotus')
  const [easyView, setEasyView] = useState(defaultData.features?.easyViewDefault ?? true)
  const musicRef = useRef(null)
  const reduced = useReducedMotion()

  const adapted = useMemo(() => {
    return adaptInvitationForTemplate02(invitationData, defaultData)
  }, [invitationData])

  // Synchronously update template proxy data
  setTemplate02Data(adapted)

  useEffect(() => {
    return () => {
      resetTemplate02Data()
    }
  }, [])

  const weddingDate = adapted?.events?.wedding?.date || defaultData.events.wedding.date
  const weddingDayState = useMemo(() => getWeddingDayState(weddingDate), [weddingDate])

  const handleOpen = () => {
    setOpened(true)
    setCurtain(true)
    try {
      musicRef.current?.start()
    } catch {
      /* audio optional */
    }
    window.setTimeout(() => setCurtain(false), reduced ? 300 : 1200)
  }

  useEffect(() => {
    if (!opened || !weddingData.features?.customCursor) return undefined
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return undefined
    document.documentElement.classList.add('custom-cursor-active')
    return () => document.documentElement.classList.remove('custom-cursor-active')
  }, [opened])

  return (
    <div className="template-02-wrapper relative w-full overflow-x-clip">
      {!opened ? (
        <div className="relative">
          {/* Top theme switcher toggle: Lotus vs Love */}
          <div className="fixed top-4 right-4 z-[60] flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40 text-[10px] text-amber-200 shadow-lg">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setOpeningTheme('lotus')
              }}
              className={`px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                openingTheme === 'lotus'
                  ? 'bg-amber-400/30 text-amber-100 font-bold border border-amber-400/50'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🪷 Lotus
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setOpeningTheme('love')
              }}
              className={`px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                openingTheme === 'love'
                  ? 'bg-rose-500/40 text-rose-100 font-bold border border-rose-400/50'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              ❤️ Love
            </button>
          </div>

          {openingTheme === 'lotus' ? (
            <LotusOpeningScreen
              onOpen={handleOpen}
              couple={weddingData.couple}
              weddingDate={weddingDate}
              lang={weddingData.features?.lang || 'ta'}
            />
          ) : (
            <LoveHeartOpeningScreen
              onOpen={handleOpen}
              couple={weddingData.couple}
              weddingDate={weddingDate}
              lang={weddingData.features?.lang || 'ta'}
            />
          )}
        </div>
      ) : null}

      <ParticleCanvas active={opened} />
      <CustomCursor enabled={opened} />
      <EasyViewToggle enabled={easyView} onToggle={() => setEasyView((v) => !v)} />
      <CurtainReveal active={curtain && opened} />

      {opened ? (
        <motion.div
          className={easyView ? 'easy-view' : ''}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.5 }}
        >
          <LuxuryShell>
            <MobileTopBar />
            <WeddingDayBanner state={weddingDayState} />
            <main className="pb-24">
              <Hero weddingDayState={weddingDayState} />
              <Countdown weddingDayState={weddingDayState} />
              <InvitationMessage />
              {weddingData.features?.kolamDividers ? <KolamDivider /> : null}
              <EventTimeline />
              {weddingData.features?.kolamDividers ? <KolamDivider /> : null}
              <FamilyBlessings />
              <Gallery />
              <VenueMaps />
              <ShareSection />
              <FinalThankYou weddingDayState={weddingDayState} />
            </main>
          </LuxuryShell>
          <MobileNavigation />
          <MusicControl ref={musicRef} />
        </motion.div>
      ) : null}
    </div>
  )
}
