import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildGoogleCalendarUrl, downloadICS } from '../../../utils/calendar'
import { buildWhatsAppUrl } from '../../../utils/whatsapp'
import LotusOpeningScreen from '../../opening/LotusOpeningScreen'
import LoveHeartOpeningScreen from '../../opening/LoveHeartOpeningScreen'

export default function Template04({ invitationData }) {
  const [isOpened, setIsOpened] = useState(false)
  const [openingTheme, setOpeningTheme] = useState('love')
  const [unfolding, setUnfolding] = useState(false)
  const [lang, setLang] = useState('en')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)
  const [activeVenueTab, setActiveVenueTab] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpForm, setRsvpForm] = useState({ name: '', response: 'accept', guests: '2' })
  const [comments, setComments] = useState([
    { name: 'Dr. Ramesh & Family', message: 'May your shared path be illuminated with joy and prosperity forever!', time: '2h ago' },
    { name: 'Priya & Vignesh', message: 'Heartiest congratulations to the wonderful couple!', time: '5h ago' },
  ])
  const [nameInput, setNameInput] = useState('')
  const [msgInput, setMsgInput] = useState('')
  const audioRef = useRef(null)

  const couple = useMemo(() => {
    return {
      bride: invitationData?.brideName || 'Anjelia',
      groom: invitationData?.groomName || 'Mathew',
      brideTamil: invitationData?.brideNameTamil || 'அஞ்சலியா',
      groomTamil: invitationData?.groomNameTamil || 'மேத்யூ',
      parentsBride: invitationData?.parents?.bride || 'Beloved daughter of Mr. Joseph Fernandes & Mrs. Maria Fernandes',
      parentsGroom: invitationData?.parents?.groom || 'Beloved son of Mr. Thomas D\'Souza & Mrs. Grace D\'Souza',
      hashtag: invitationData?.hashtag || '#AnjeliaMathewForever',
      heroImage: invitationData?.photos?.couple || '/images/hero-couple.jpg',
      brideImage: invitationData?.photos?.bride || '/images/gallery-photo-1.jpg',
      groomImage: invitationData?.photos?.groom || '/images/gallery-photo-2.jpg',
      musicUrl: invitationData?.musicUrl || '/music.mp3',
      rsvpPhone: invitationData?.rsvpPhone || '+91 97766 55443',
    }
  }, [invitationData])

  const events = useMemo(() => {
    if (Array.isArray(invitationData?.events) && invitationData.events.length > 0) {
      return invitationData.events
    }
    return [
      {
        id: 'ceremony',
        title: 'Holy Matrimony & Nuptial Mass',
        titleTamil: 'திருமண திருப்பலி',
        date: '2026-11-29',
        time: '10:30 AM',
        venueName: "St. Patrick's Cathedral",
        venueAddress: 'Brigade Road, Bangalore',
        mapsUrl: 'https://maps.google.com/?q=St+Patricks+Bangalore',
        image: '/images/story-1.jpg',
      },
      {
        id: 'reception',
        title: 'Grand Banquet & Evening Ball',
        titleTamil: 'மங்கல விருந்து',
        date: '2026-11-29',
        time: '06:30 PM',
        venueName: 'The Leela Palace Grand Ballroom',
        venueAddress: 'Old Airport Road, Bangalore',
        mapsUrl: 'https://maps.google.com/?q=The+Leela+Palace+Bangalore',
        image: '/images/story-2.jpg',
      },
    ]
  }, [invitationData])

  const galleryImages = [
    couple.heroImage,
    couple.brideImage,
    couple.groomImage,
    '/images/gallery-photo-1.jpg',
    '/images/gallery-photo-2.jpg',
    '/images/gallery-photo-3.jpg',
  ]

  // Countdown timer
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const target = new Date(`${events[0]?.date || '2026-11-29'}T10:30:00`).getTime()
    const interval = setInterval(() => {
      const diff = Math.max(0, target - Date.now())
      setCountdown({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [events])

  const handleOpen = () => {
    setUnfolding(true)
    setTimeout(() => {
      setIsOpened(true)
      try {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {})
          setMusicPlaying(true)
        }
      } catch {}
    }, 700)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setMusicPlaying(true)
    }
  }

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleShareWhatsApp = () => {
    const text =
      lang === 'ta'
        ? `அன்புடையீர் வணக்கம்! ${couple.brideTamil} மற்றும் ${couple.groomTamil} திருமண அழைப்பிதழ் இதோ:\n${window.location.href}`
        : `Warm greetings! We invite you to celebrate the holy wedding of ${couple.bride} & ${couple.groom}:\n${window.location.href}`
    window.open(buildWhatsAppUrl(couple.rsvpPhone, text), '_blank')
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!nameInput.trim() || !msgInput.trim()) return
    setComments([{ name: nameInput.trim(), message: msgInput.trim(), time: 'Just now' }, ...comments])
    setNameInput('')
    setMsgInput('')
  }

  const coupleDisplayName = lang === 'ta' ? `${couple.brideTamil} & ${couple.groomTamil}` : `${couple.bride} & ${couple.groom}`

  return (
    <div className="template-04-root relative min-h-screen bg-[#fbf9f6] text-[#29231f] font-serif pb-24 overflow-x-hidden selection:bg-[#dfd5c7]">
      <audio ref={audioRef} loop src={couple.musicUrl} preload="auto" />

      {/* FLOATING AMBIENT GOLD SPARKLES */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#c5a869] opacity-30 animate-pulse"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 29) % 90}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              boxShadow: '0 0 10px #c5a869',
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* ANIMATED LOVE HEART / LOTUS OPENING EXPERIENCE */}
      {!isOpened && (
        <div className="relative">
          {/* Top theme switcher toggle: Love vs Lotus */}
          <div className="fixed top-4 right-4 z-[60] flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-400/40 text-[10px] text-rose-200 shadow-lg">
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
          </div>

          {openingTheme === 'love' ? (
            <LoveHeartOpeningScreen
              onOpen={handleOpen}
              couple={{
                brideName: couple.bride,
                groomName: couple.groom,
                brideNameTamil: couple.brideTamil,
                groomNameTamil: couple.groomTamil,
              }}
              weddingDate={events[0]?.date}
              lang={lang}
            />
          ) : (
            <LotusOpeningScreen
              onOpen={handleOpen}
              couple={{
                brideName: couple.bride,
                groomName: couple.groom,
                brideNameTamil: couple.brideTamil,
                groomNameTamil: couple.groomTamil,
              }}
              weddingDate={events[0]?.date}
              lang={lang}
            />
          )}
        </div>
      )}

      {/* TOP STICKY BAR: BRAND, LANGUAGE & AUDIO */}
      {isOpened && (
        <header className="sticky top-0 z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e6dcce] px-4 py-2.5 flex items-center justify-between shadow-xs">
          <span className="font-bold text-sm text-[#1f1b18] tracking-wide">
            {coupleDisplayName}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="px-2.5 py-1 rounded-lg text-xs font-sans font-semibold border border-[#c5a869]/50 bg-[#faf6f0] text-[#7a5c24] hover:bg-[#ede2d4] transition"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>

            <button
              onClick={toggleMusic}
              className="w-9 h-9 rounded-full bg-[#241e1a] text-[#d4af37] border border-[#c5a869]/40 flex items-center justify-center text-xs cursor-pointer shadow-md"
              title={musicPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {musicPlaying ? '❚❚' : '▶'}
            </button>
          </div>
        </header>
      )}

      {/* MAIN INVITATION BODY */}
      {isOpened && (
        <main className="max-w-2xl mx-auto px-4 py-8 space-y-16">
          {/* 1. HERO SECTION */}
          <section id="home" className="text-center space-y-4 pt-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-semibold text-[#8c6d34] bg-[#f2ebe1] px-4 py-1.5 rounded-full border border-[#ded3c3]">
              {lang === 'ta' ? 'புனித திருமண அழைப்பிதழ்' : 'The Holy Matrimony'}
            </span>

            <h2 className="text-4xl sm:text-6xl font-bold text-[#1f1b18] tracking-wide">
              {coupleDisplayName}
            </h2>
            <p className="text-xs font-sans tracking-widest text-[#8c7462] uppercase">
              {couple.hashtag}
            </p>

            <div className="relative mx-auto mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffffff] max-w-md aspect-[4/5] group">
              <img src={couple.heroImage} alt="Couple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15110f]/85 via-transparent to-transparent flex items-end p-6">
                <p className="text-[#f7f2ea] text-xs sm:text-sm italic text-center w-full leading-relaxed">
                  "Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres."
                </p>
              </div>
            </div>
          </section>

          {/* 2. LIVE COUNTDOWN CLOCK */}
          <section className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs text-center space-y-4">
            <h3 className="text-xl font-bold text-[#1f1b18]">
              {lang === 'ta' ? 'திருமண நாளை நோக்கி...' : 'Countdown To The Nuptial Mass'}
            </h3>
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto font-sans">
              <div className="bg-[#f7f2ea] p-3 rounded-2xl border border-[#ded3c3]">
                <span className="font-serif text-2xl font-bold text-[#8c6d34] block">{countdown.d}</span>
                <span className="text-[10px] text-[#75675e] uppercase">{lang === 'ta' ? 'நாட்கள்' : 'Days'}</span>
              </div>
              <div className="bg-[#f7f2ea] p-3 rounded-2xl border border-[#ded3c3]">
                <span className="font-serif text-2xl font-bold text-[#8c6d34] block">{countdown.h}</span>
                <span className="text-[10px] text-[#75675e] uppercase">{lang === 'ta' ? 'மணி' : 'Hours'}</span>
              </div>
              <div className="bg-[#f7f2ea] p-3 rounded-2xl border border-[#ded3c3]">
                <span className="font-serif text-2xl font-bold text-[#8c6d34] block">{countdown.m}</span>
                <span className="text-[10px] text-[#75675e] uppercase">{lang === 'ta' ? 'நிமிடம்' : 'Mins'}</span>
              </div>
              <div className="bg-[#f7f2ea] p-3 rounded-2xl border border-[#ded3c3]">
                <span className="font-serif text-2xl font-bold text-[#c5a869] block">{countdown.s}</span>
                <span className="text-[10px] text-[#75675e] uppercase">{lang === 'ta' ? 'விநாடி' : 'Secs'}</span>
              </div>
            </div>
          </section>

          {/* 3. LOVE STORY / MILESTONES */}
          <section id="story" className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'எங்கள் காதல் பயணம்' : 'Our Love Story'}
              </h3>
              <p className="text-xs font-sans text-[#75675e]">Chapters on our path to the altar</p>
            </div>

            <div className="space-y-3 font-sans">
              {[
                { title: 'Divine Encounter', date: 'Spring 2024', desc: 'An unexpected encounter at church fellowship that sparked endless conversations and deep shared faith.' },
                { title: 'The Blessed Promise', date: 'Summer 2025', desc: 'By the serene lakeside, a heartfelt prayer and proposal was answered with a resounding yes.' },
                { title: 'Holy Matrimony', date: events[0]?.date, desc: 'United forever under the grace and blessings of our Lord and our beloved community.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#ffffff] p-5 rounded-2xl border border-[#e6dcce] flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#f7f2ea] text-[#8c6d34] flex items-center justify-center font-bold text-sm shrink-0 border border-[#ded3c3]">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif font-bold text-sm text-[#1f1b18]">{item.title}</h4>
                      <span className="text-[10px] text-[#8c6d34] font-semibold bg-[#f7f2ea] px-2 py-0.5 rounded border border-[#ded3c3]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[#63544b] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. BRIDE & GROOM PROFILE CARDS */}
          <section className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'மணமக்கள் விவரம்' : 'The Bride & Groom'}
              </h3>
              <p className="text-xs font-sans text-[#75675e] mt-1">Beloved children of our families</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs text-center space-y-3">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#c5a869] shadow-md">
                  <img src={couple.brideImage} alt={couple.bride} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-bold text-[#1f1b18]">
                  {lang === 'ta' ? couple.brideTamil : couple.bride}
                </h4>
                <p className="text-xs font-sans text-[#75675e] leading-relaxed">{couple.parentsBride}</p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs text-center space-y-3">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#c5a869] shadow-md">
                  <img src={couple.groomImage} alt={couple.groom} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-bold text-[#1f1b18]">
                  {lang === 'ta' ? couple.groomTamil : couple.groom}
                </h4>
                <p className="text-xs font-sans text-[#75675e] leading-relaxed">{couple.parentsGroom}</p>
              </div>
            </div>
          </section>

          {/* 5. CEREMONIES TIMELINE & CALENDAR ADD */}
          <section id="events" className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'திருமண நிகழ்வுகள்' : 'Wedding Itinerary'}
              </h3>
              <p className="text-xs font-sans text-[#75675e] mt-1">Ceremonies and auspicious celebrations</p>
            </div>

            <div className="space-y-4">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f2ebe1] pb-3">
                    <div>
                      <h4 className="text-xl font-bold text-[#1f1b18]">
                        {lang === 'ta' && ev.titleTamil ? ev.titleTamil : ev.title}
                      </h4>
                      <p className="text-xs text-[#8c6d34] font-sans font-semibold">📅 {ev.date}</p>
                    </div>
                    <span className="text-xs font-sans font-bold bg-[#f7f2ea] text-[#8c6d34] px-3 py-1 rounded-full border border-[#ded3c3]">
                      {ev.time}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs font-sans text-[#63544b]">
                    <p className="font-bold text-[#1f1b18]">🏛 Venue: {ev.venueName}</p>
                    <p className="text-[#8c7462]">📍 Address: {ev.venueAddress}</p>
                  </div>

                  {/* Calendar & Map Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#f7f2ea] font-sans">
                    <a
                      href={buildGoogleCalendarUrl(ev, coupleDisplayName)}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-[#c5a869] hover:bg-[#b39149] text-[#1c1713] text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>📅</span>
                      <span>{lang === 'ta' ? 'கூகுள் கேலெண்டரில் சேர்' : 'Add to Google Calendar'}</span>
                    </a>
                    <button
                      onClick={() => downloadICS(ev, coupleDisplayName)}
                      className="py-2.5 px-4 rounded-xl bg-[#faf6f0] hover:bg-[#ede2d4] border border-[#c5a869]/50 text-[#7a5c24] text-xs font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>📥</span>
                      <span>{lang === 'ta' ? '.ICS பதிவிறக்கம்' : 'Download .ICS Calendar'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. ROMANTIC POLAROID PHOTO GALLERY & LIGHTBOX */}
          <section id="gallery" className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8c6d34] block">
                ✦ {lang === 'ta' ? 'காதல் தருணங்கள்' : 'Moments In Time'} ✦
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Polaroid Romance Gallery'}
              </h3>
              <p className="text-xs font-sans text-[#75675e]">Click any polaroid to view in high resolution</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
              {galleryImages.map((src, idx) => {
                const tilts = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
                const captions = ['Golden Hours', 'Forever & Always', 'Endless Love', 'Two Hearts', 'Joyful Smiles', 'The Beginning']
                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`bg-white p-3 sm:p-4 rounded-2xl border border-[#e6dcce] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:rotate-0 cursor-pointer group ${tilts[idx % tilts.length]}`}
                  >
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#faf6f0] relative">
                      <img src={src} alt={`Polaroid ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full font-sans font-bold">🔍 View</span>
                      </div>
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <p className="font-serif italic text-xs text-[#5c4a3e]">{captions[idx % captions.length]}</p>
                      <span className="text-[10px] text-[#a69384] font-sans">0{idx + 1} / 0{galleryImages.length}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* LIGHTBOX MODAL WITH PREV / NEXT / COUNTER */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#110e0c]/92 backdrop-blur-md cursor-pointer"
              onClick={() => setLightboxIndex(null)}
            >
              <div
                className="relative max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-[#c5a869]/40 shadow-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={galleryImages[lightboxIndex]} alt="Enlarged" className="w-full h-full max-h-[75vh] object-contain mx-auto" />
                
                <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs text-white font-sans font-bold">
                  <span className="bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    Photo {lightboxIndex + 1} of {galleryImages.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm font-bold border border-white/20 hover:bg-black/90 transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <button
                  onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-lg font-bold border border-white/20 hover:bg-black/90 transition cursor-pointer"
                  title="Previous Photo"
                >
                  ‹
                </button>
                <button
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-lg font-bold border border-white/20 hover:bg-black/90 transition cursor-pointer"
                  title="Next Photo"
                >
                  ›
                </button>
              </div>
            </div>
          )}

          {/* 7. TABBED VENUE & DIRECTIONS */}
          <section id="venue" className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'திருமண மண்டபம் மற்றும் வழிகாட்டி' : 'Venue & Location'}
              </h3>
              <p className="text-xs font-sans text-[#75675e]">Select ceremony to view interactive map</p>
            </div>

            <div className="flex border-b border-[#f2ebe1] overflow-x-auto gap-2 font-sans">
              {events.map((ev, i) => (
                <button
                  key={ev.id || i}
                  onClick={() => setActiveVenueTab(i)}
                  className={`pb-2 px-3 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeVenueTab === i
                      ? 'border-b-2 border-[#8c6d34] text-[#8c6d34]'
                      : 'text-[#8c7462] hover:text-[#1f1b18]'
                  }`}
                >
                  {ev.title}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2 font-sans">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#1f1b18] text-sm font-serif">{events[activeVenueTab]?.venueName}</p>
                <p className="text-[#63544b]">{events[activeVenueTab]?.venueAddress}</p>
              </div>

              <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#e6dcce] bg-[#fcfbf9]">
                <iframe
                  title="Venue Map"
                  className="w-full h-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(events[activeVenueTab]?.venueAddress || events[activeVenueTab]?.venueName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                />
              </div>

              <a
                href={events[activeVenueTab]?.mapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#1f1b18] text-[#ffffff] font-semibold text-xs text-center transition hover:bg-[#3d3630] block"
              >
                Open Venue in Google Maps ↗
              </a>
            </div>
          </section>

          {/* 8. WEDDING GIFT REGISTRY */}
          <section id="gifts" className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#f7f2ea] text-[#8c6d34] flex items-center justify-center text-xl mx-auto border border-[#c5a869]/40">
              💌
            </div>
            <h3 className="text-2xl font-bold text-[#1f1b18]">
              {lang === 'ta' ? 'மங்கல அன்பளிப்பு' : 'Wedding Gift Registry'}
            </h3>
            <p className="text-xs font-sans text-[#75675e] max-w-sm mx-auto">
              Your prayers and loving presence are our greatest treasure. For guests who wish to offer a monetary gift or bless our home:
            </p>

            <div className="bg-[#fcfbf9] p-4 rounded-2xl border border-[#e6dcce] max-w-sm mx-auto text-left font-sans text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#75675e]">Bank Name:</span>
                <span className="font-bold text-[#1f1b18]">Standard Chartered / HDFC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75675e]">UPI / Transfer ID:</span>
                <span className="font-mono font-bold text-[#1f1b18]">mathew.anjelia@upi</span>
              </div>
              <button
                onClick={() => handleCopy('mathew.anjelia@upi', 't4-upi')}
                className="w-full mt-2 py-2 rounded-xl bg-[#f2ebe1] hover:bg-[#e6dcce] text-[#1f1b18] font-semibold text-xs transition cursor-pointer"
              >
                {copiedKey === 't4-upi' ? '✓ Copied ID to Clipboard!' : 'Copy Bank Account Details'}
              </button>
            </div>
          </section>

          {/* 9. WHATSAPP SHARE & RSVP */}
          <section id="rsvp" className="space-y-4">
            <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs text-center space-y-4 font-sans">
              <h3 className="font-serif text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'அழைப்பிதழைப் பகிர்க' : 'Share Invitation'}
              </h3>
              <p className="text-xs text-[#75675e]">Forward this holy wedding invitation to family and friends on WhatsApp</p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleShareWhatsApp}
                  className="py-3 px-5 rounded-2xl bg-[#25D366] text-[#ffffff] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#20ba59] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>💬</span>
                  <span>Share via WhatsApp</span>
                </button>
                <button
                  onClick={() => handleCopy(window.location.href, 'link')}
                  className="py-3 px-5 rounded-2xl bg-[#f2ebe1] text-[#1f1b18] font-semibold text-xs transition cursor-pointer"
                >
                  {copiedKey === 'link' ? '✓ Copied Link!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* RSVP Form */}
            <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs space-y-4 font-sans">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#1f1b18]">
                  {lang === 'ta' ? 'வருகை உறுதிப்படுத்தல்' : 'RSVP Confirmation'}
                </h3>
                <p className="text-xs text-[#75675e]">Please confirm your attendance for dinner arrangements</p>
              </div>

              {rsvpDone ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs text-center font-medium">
                  ✓ Thank you! Your RSVP has been confirmed. We look forward to celebrating with you!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setRsvpDone(true)
                  }}
                  className="space-y-3 text-xs"
                >
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#e6dcce] bg-[#fcfbf9]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, response: 'accept' })}
                      className={`py-2 rounded-xl font-semibold border ${
                        rsvpForm.response === 'accept' ? 'bg-[#1f1b18] text-white border-[#1f1b18]' : 'border-[#e6dcce] text-[#75675e]'
                      }`}
                    >
                      ✓ Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, response: 'decline' })}
                      className={`py-2 rounded-xl font-semibold border ${
                        rsvpForm.response === 'decline' ? 'bg-[#1f1b18] text-white border-[#1f1b18]' : 'border-[#e6dcce] text-[#75675e]'
                      }`}
                    >
                      ✕ Regretfully Decline
                    </button>
                  </div>

                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#e6dcce] bg-[#fcfbf9]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">Family (4+ Persons)</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1f1b18] text-white font-bold uppercase tracking-wider"
                  >
                    Send RSVP Response
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* 10. BLESSINGS & GUESTBOOK */}
          <section className="bg-[#ffffff] p-6 rounded-3xl border border-[#e6dcce] shadow-xs space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1f1b18]">
                {lang === 'ta' ? 'வாழ்த்துக்கள் மற்றும் ஆசிகள்' : 'Blessings & Guestbook'}
              </h3>
              <p className="text-xs font-sans text-[#75675e]">Share your prayers and heartfelt wishes</p>
            </div>

            <form onSubmit={handleAddComment} className="space-y-2.5 font-sans text-xs">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#e6dcce] bg-[#fcfbf9]"
              />
              <textarea
                rows={2}
                required
                placeholder="Your message for the couple..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#e6dcce] bg-[#fcfbf9]"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#1f1b18] text-[#ffffff] font-bold">
                Send Blessings
              </button>
            </form>

            <div className="space-y-2 pt-2 max-h-56 overflow-y-auto font-sans">
              {comments.map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#fcfbf9] border border-[#f2ebe1] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1f1b18]">{c.name}</span>
                    <span className="text-[10px] text-[#8c7462]">{c.time}</span>
                  </div>
                  <p className="text-[#63544b]">{c.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 11. FOOTER */}
          <footer className="text-center pt-8 border-t border-[#e6dcce] text-xs font-sans text-[#75675e] space-y-2">
            <p className="font-serif font-bold text-lg text-[#1f1b18]">{coupleDisplayName}</p>
            <p className="font-serif italic">
              {lang === 'ta' ? 'எங்கள் இல்லத் திருமண விழாவிற்கு வருகை தந்தருள வேண்டுகிறோம்.' : 'We eagerly look forward to celebrating this sacred day with you.'}
            </p>
            <p className="text-[10px] text-[#8c6d34] tracking-widest uppercase font-mono pt-2">
              {couple.hashtag}
            </p>
          </footer>
        </main>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR */}
      {isOpened && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-t border-[#e6dcce] py-2 px-3 flex justify-around items-center max-w-2xl mx-auto shadow-2xl font-sans">
          <a href="#home" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>🏠</span>
            <span>Home</span>
          </a>
          <a href="#story" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>📖</span>
            <span>Story</span>
          </a>
          <a href="#events" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>📅</span>
            <span>Itinerary</span>
          </a>
          <a href="#gallery" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>🖼</span>
            <span>Gallery</span>
          </a>
          <a href="#venue" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>📍</span>
            <span>Venue</span>
          </a>
          <a href="#rsvp" className="text-center text-[10px] text-[#75675e] hover:text-[#8c6d34] flex flex-col items-center">
            <span>💌</span>
            <span>RSVP</span>
          </a>
        </nav>
      )}
    </div>
  )
}
