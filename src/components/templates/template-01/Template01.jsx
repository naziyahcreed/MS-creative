import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import weddingData, { setTemplate01Data, resetTemplate01Data } from './data/weddingData'
import defaultData from './defaultData'
import { adaptInvitationForTemplate01 } from '../../../utils/invitationAdapter'
import { useActiveSection } from '../../../hooks/useActiveSection'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import OpeningScreen from './OpeningScreen'
import DoorReveal from './DoorReveal'
import PetalCanvas from './PetalCanvas'
import MobileNav from './MobileNav'
import Hero from './Hero'
import OurStory from './OurStory'
import FamilyBlessings from './FamilyBlessings'
import EventJourney from './EventJourney'
import Countdown from './Countdown'
import Gallery from './Gallery'
import Venue from './Venue'
import HowToReach from './HowToReach'
import MapsSection from './MapsSection'
import GiftsBlessings from './GiftsBlessings'
import ShareSection from './ShareSection'
import ThankYou from './ThankYou'
import MusicControl from './MusicControl'

const SECTIONS = ['home', 'story', 'events', 'gallery', 'venue']

export default function Template01({ invitationData }) {
  const [opened, setOpened] = useState(false)
  const [doors, setDoors] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const musicRef = useRef(null)
  const reduced = useReducedMotion()

  const adapted = useMemo(() => {
    return adaptInvitationForTemplate01(invitationData, defaultData)
  }, [invitationData])

  // Synchronously update template proxy data before children render
  setTemplate01Data(adapted)

  useEffect(() => {
    return () => {
      resetTemplate01Data()
    }
  }, [])

  const handleOpen = () => {
    setOpened(true)
    setDoors(true)
    setMusicOn(true)
    try {
      musicRef.current?.start()
    } catch {
      // Audio optional
    }
    if (reduced) {
      setDoors(false)
    }
  }

  return (
    <div className="template-01-container relative w-full bg-[#120c08] min-h-dvh">
      <DoorReveal active={doors && opened} onComplete={() => setDoors(false)} />
      <div className="phone-shell">
        {!opened ? <OpeningScreen onOpen={handleOpen} /> : null}
        <PetalCanvas active={opened} />
        <MusicControl ref={musicRef} on={musicOn} />

        {opened ? (
          <InvitationContent
            reduced={reduced}
            musicOn={musicOn}
            onMusic={() => setMusicOn((v) => !v)}
          />
        ) : null}
      </div>
    </div>
  )
}

function InvitationContent({ reduced, musicOn, onMusic }) {
  const active = useActiveSection(SECTIONS)

  return (
    <motion.div
      className="parchment min-h-dvh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : 0.35 }}
    >
      <MobileNav active={active} musicOn={musicOn} onMusic={onMusic} />
      <main>
        <Hero />
        <OurStory />
        <FamilyBlessings />
        <EventJourney />
        <Countdown />
        <Gallery />
        <Venue />
        <HowToReach />
        <MapsSection />
        <GiftsBlessings />
        <ShareSection />
        <ThankYou />
      </main>

      <footer className="bg-[#1c0f0a] border-t border-[#c4a35a]/30 px-4 pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center">
        <p className="font-cinzel text-xs tracking-[0.25em] text-[#ffd56b] uppercase">
          {weddingData.couple.hashtag}
        </p>
        <p className="mt-4 text-[10px] tracking-[0.2em] text-[#a8927a]/70 uppercase">
          With Love • {weddingData.couple.brideName} & {weddingData.couple.groomName}
        </p>
      </footer>
    </motion.div>
  )
}
