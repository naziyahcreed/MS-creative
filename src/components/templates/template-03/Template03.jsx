import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildGoogleCalendarUrl, downloadICS } from '../../../utils/calendar'
import { buildWhatsAppUrl } from '../../../utils/whatsapp'
import LotusOpeningScreen from '../../opening/LotusOpeningScreen'
import LoveHeartOpeningScreen from '../../opening/LoveHeartOpeningScreen'

export default function Template03({ invitationData }) {
  const [opened, setOpened] = useState(false)
  const [openingTheme, setOpeningTheme] = useState('love')
  const [openingAnimation, setOpeningAnimation] = useState(false)
  const [lang, setLang] = useState('en')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [copiedBank, setCopiedBank] = useState(null)
  const [activeVenueTab, setActiveVenueTab] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpData, setRsvpData] = useState({ name: '', attendance: 'yes', guests: '2', notes: '' })
  const [wishes, setWishes] = useState([
    { name: 'Kavitha & Anand', text: 'May your shared path be filled with unending laughter, peace, and mutual love!', time: '1 hour ago' },
    { name: 'Senthil & Family', text: 'Hearty congratulations to the beautiful couple! So excited to celebrate with you.', time: '3 hours ago' },
  ])
  const [newWish, setNewWish] = useState({ name: '', text: '' })

  const audioRef = useRef(null)
  const petalCanvasRef = useRef(null)

  // Couple Data
  const couple = useMemo(() => {
    return {
      bride: invitationData?.brideName || 'Anjelia',
      groom: invitationData?.groomName || 'Mathew',
      brideTamil: invitationData?.brideNameTamil || 'அஞ்சலியா',
      groomTamil: invitationData?.groomNameTamil || 'மேத்யூ',
      parentsBride: invitationData?.parents?.bride || 'Daughter of Thiru. S. Ramanathan & Thirumathi. R. Meenakshi',
      parentsGroom: invitationData?.parents?.groom || 'Son of Thiru. M. Natarajan & Thirumathi. N. Soundarya',
      hashtag: invitationData?.hashtag || '#AnjeliaWedsMathew',
      heroPhoto: invitationData?.photos?.couple || '/images/hero-couple.jpg',
      bridePhoto: invitationData?.photos?.bride || '/images/gallery-1.jpg',
      groomPhoto: invitationData?.photos?.groom || '/images/gallery-2.jpg',
      musicUrl: invitationData?.musicUrl || '/music.mp3',
      rsvpPhone: invitationData?.rsvpPhone || '+91 98765 43210',
    }
  }, [invitationData])

  const events = useMemo(() => {
    if (Array.isArray(invitationData?.events) && invitationData.events.length > 0) {
      return invitationData.events
    }
    return [
      {
        id: 'engagement',
        title: 'Floral Ring Exchange',
        titleTamil: 'நிச்சயதார்த்தம்',
        date: '2026-11-19',
        time: '06:00 PM',
        venueName: 'The Courtyard Orchid Lawn',
        venueAddress: 'Palace Grounds, Bellary Road, Bangalore',
        mapsUrl: 'https://maps.google.com/?q=Palace+Grounds+Bangalore',
        image: '/images/story-1.jpg',
      },
      {
        id: 'wedding',
        title: 'Botanical Wedding Vows',
        titleTamil: 'திருமண முகூர்த்தம்',
        date: '2026-11-20',
        time: '09:30 AM',
        venueName: 'The Botanical Glasshouse Mandapam',
        venueAddress: 'Green Valley Garden, Bangalore',
        mapsUrl: 'https://maps.google.com/?q=Botanical+Garden+Bangalore',
        image: '/images/story-2.jpg',
      },
      {
        id: 'reception',
        title: 'Evening Candlelight Reception',
        titleTamil: 'மங்கல வரவேற்பு',
        date: '2026-11-20',
        time: '07:00 PM',
        venueName: 'The Grand Floral Ballroom',
        venueAddress: 'Residency Enclave, Bangalore',
        mapsUrl: 'https://maps.google.com/?q=Bangalore',
        image: '/images/story-3.jpg',
      },
    ]
  }, [invitationData])

  const galleryImages = [
    couple.heroPhoto,
    couple.bridePhoto,
    couple.groomPhoto,
    '/images/gallery-photo-1.jpg',
    '/images/gallery-photo-2.jpg',
    '/images/gallery-photo-3.jpg',
  ]

  // Live countdown
  const weddingDate = events.find((e) => e.id === 'wedding')?.date || events[0]?.date || '2026-11-20'
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const target = new Date(`${weddingDate}T09:30:00`).getTime()
    const timer = setInterval(() => {
      const diff = Math.max(0, target - Date.now())
      setCountdown({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [weddingDate])

  // Canvas Petals Physics Simulation
  useEffect(() => {
    const canvas = petalCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const petals = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1 - 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.3,
      color: Math.random() > 0.5 ? '#f4cfc6' : '#d2e4cb',
    }))

    let animId
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      petals.forEach((p) => {
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.01) + p.speedX
        p.rotation += p.rotationSpeed
        if (p.y > height + 20) {
          p.y = -20
          p.x = Math.random() * width
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 1.5, Math.PI / 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      animId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [opened])

  const handleOpen = () => {
    setOpeningAnimation(true)
    setTimeout(() => {
      setOpened(true)
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
    setCopiedBank(key)
    setTimeout(() => setCopiedBank(null), 2000)
  }

  const handleShareWhatsApp = () => {
    const text =
      lang === 'ta'
        ? `அன்புடையீர் வணக்கம்! ${couple.brideTamil} மற்றும் ${couple.groomTamil} திருமண அழைப்பிதழ் இதோ:\n${window.location.href}`
        : `Warm greetings! We invite you to celebrate the wedding of ${couple.bride} & ${couple.groom}:\n${window.location.href}`
    window.open(buildWhatsAppUrl(couple.rsvpPhone, text), '_blank')
  }

  const handleWishSubmit = (e) => {
    e.preventDefault()
    if (!newWish.name.trim() || !newWish.text.trim()) return
    setWishes([{ name: newWish.name.trim(), text: newWish.text.trim(), time: 'Just now' }, ...wishes])
    setNewWish({ name: '', text: '' })
  }

  const coupleDisplayName = lang === 'ta' ? `${couple.brideTamil} & ${couple.groomTamil}` : `${couple.bride} & ${couple.groom}`

  return (
    <div className="template-03-root relative min-h-screen bg-[#fcfaf7] text-[#3d322b] font-sans selection:bg-[#e8d8c9] pb-24 overflow-x-hidden">
      <audio ref={audioRef} loop src={couple.musicUrl} preload="auto" />

      {/* Canvas for Floating Blossom Petals */}
      <canvas ref={petalCanvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* ANIMATED LOVE HEART / LOTUS OPENING EXPERIENCE */}
      {!opened && (
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
              weddingDate={weddingDate}
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
              weddingDate={weddingDate}
              lang={lang}
            />
          )}
        </div>
      )}

      {/* TOP FLOATING CONTROLS: LANGUAGE & MUSIC */}
      {opened && (
        <header className="sticky top-0 z-40 bg-[#ffffff]/85 backdrop-blur-md border-b border-[#e8ded0] px-4 py-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#3d322b] tracking-wide">
              {coupleDisplayName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#d8c8b6] bg-[#fbf8f4] text-[#6d5032] hover:bg-[#ede2d4] transition"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>

            <button
              onClick={toggleMusic}
              className={`w-9 h-9 rounded-full bg-[#3d322b] text-[#ffffff] shadow-md flex items-center justify-center text-xs transition cursor-pointer ${
                musicPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
              title={musicPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              🎵
            </button>
          </div>
        </header>
      )}

      {/* MAIN INVITATION BODY */}
      {opened && (
        <main className="max-w-xl mx-auto px-4 py-8 space-y-16">
          {/* 1. HERO SECTION */}
          <section id="home" className="text-center space-y-4 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a07c57] bg-[#f4ede2] px-3.5 py-1 rounded-full border border-[#e8ded0]">
              {lang === 'ta' ? 'திருமண அழைப்பிதழ்' : 'Save Our Auspicious Date'}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#3d322b] tracking-wide">
              {coupleDisplayName}
            </h2>
            <p className="text-xs tracking-widest uppercase text-[#8c7462] font-semibold">
              {couple.hashtag}
            </p>

            <div className="relative mx-auto mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffffff] max-w-sm aspect-[4/5] group">
              <img src={couple.heroPhoto} alt="Hero Couple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c221b]/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-[#ffffff] text-xs font-serif italic text-center w-full">
                  {lang === 'ta'
                    ? 'பெற்றோர் மற்றும் பெரியோர்களின் ஆசிர்வாதத்துடன் தொடங்கும் புதிய அத்தியாயம்'
                    : 'Beginning our beautiful new chapter with the blessings of our parents and loved ones.'}
                </p>
              </div>
            </div>
          </section>

          {/* 2. LIVE COUNTDOWN */}
          <section className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-sm text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#3d322b]">
              {lang === 'ta' ? 'திருமண நாளை நோக்கி...' : 'Countdown to Forever'}
            </h3>
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
              <div className="bg-[#faf5ee] p-3 rounded-2xl border border-[#ede3d5]">
                <span className="font-serif text-2xl font-bold text-[#a07c57] block">{countdown.d}</span>
                <span className="text-[10px] text-[#7a6759] uppercase font-semibold">{lang === 'ta' ? 'நாட்கள்' : 'Days'}</span>
              </div>
              <div className="bg-[#faf5ee] p-3 rounded-2xl border border-[#ede3d5]">
                <span className="font-serif text-2xl font-bold text-[#a07c57] block">{countdown.h}</span>
                <span className="text-[10px] text-[#7a6759] uppercase font-semibold">{lang === 'ta' ? 'மணி' : 'Hours'}</span>
              </div>
              <div className="bg-[#faf5ee] p-3 rounded-2xl border border-[#ede3d5]">
                <span className="font-serif text-2xl font-bold text-[#a07c57] block">{countdown.m}</span>
                <span className="text-[10px] text-[#7a6759] uppercase font-semibold">{lang === 'ta' ? 'நிமிடம்' : 'Mins'}</span>
              </div>
              <div className="bg-[#faf5ee] p-3 rounded-2xl border border-[#ede3d5]">
                <span className="font-serif text-2xl font-bold text-[#ba9269] block">{countdown.s}</span>
                <span className="text-[10px] text-[#7a6759] uppercase font-semibold">{lang === 'ta' ? 'விநாடி' : 'Secs'}</span>
              </div>
            </div>
          </section>

          {/* 3. OUR STORY & MILESTONES */}
          <section id="story" className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'எங்கள் காதல் பயணம்' : 'Our Story & Milestones'}
              </h3>
              <p className="text-xs text-[#8c7462]">Moments that led us to forever</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'The First Hello', date: 'August 2024', desc: 'A casual conversation that turned into hours of shared laughter and instant connection.' },
                { title: 'The Proposal', date: 'March 2026', desc: 'Under the open sky and twinkling city lights, a heartfelt promise was sealed with a ring.' },
                { title: 'The Big Day', date: weddingDate, desc: 'Stepping hand in hand into eternity, surrounded by our beloved family and friends.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#ffffff] p-5 rounded-2xl border border-[#e8ded0] flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#f4ede2] text-[#a07c57] flex items-center justify-center font-bold text-sm shrink-0 border border-[#e0d3c4]">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif font-bold text-sm text-[#3d322b]">{item.title}</h4>
                      <span className="text-[10px] text-[#8c7462] font-semibold bg-[#faf5ee] px-2 py-0.5 rounded border border-[#ede3d5]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[#6e5d50] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. COUPLE & FAMILY BLESSINGS */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'மணமக்கள் மற்றும் குடும்பத்தினர்' : 'The Bride & Groom'}
              </h3>
              <p className="text-xs text-[#8c7462]">Blessed with the love of our families</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] text-center space-y-3 shadow-xs">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#ba9269] shadow-md">
                  <img src={couple.bridePhoto} alt={couple.bride} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#3d322b]">
                    {lang === 'ta' ? couple.brideTamil : couple.bride}
                  </h4>
                  <p className="text-[11px] text-[#7a6759] mt-1 leading-relaxed">{couple.parentsBride}</p>
                </div>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] text-center space-y-3 shadow-xs">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#ba9269] shadow-md">
                  <img src={couple.groomPhoto} alt={couple.groom} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#3d322b]">
                    {lang === 'ta' ? couple.groomTamil : couple.groom}
                  </h4>
                  <p className="text-[11px] text-[#7a6759] mt-1 leading-relaxed">{couple.parentsGroom}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CEREMONIES TIMELINE & CALENDAR ADD */}
          <section id="events" className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'திருமண நிகழ்வுகள்' : 'Ceremonies & Itinerary'}
              </h3>
              <p className="text-xs text-[#8c7462]">Mark your calendars for our auspicious moments</p>
            </div>

            <div className="space-y-4">
              {events.map((ev, idx) => (
                <div key={ev.id || idx} className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f2e7db] pb-3">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#3d322b]">
                        {lang === 'ta' && ev.titleTamil ? ev.titleTamil : ev.title}
                      </h4>
                      <p className="text-xs text-[#a07c57] font-semibold">📅 {ev.date}</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-[#faf5ee] px-3 py-1 rounded-full border border-[#ede3d5] text-[#8c6d34]">
                      {ev.time}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#6e5d50]">
                    <p className="font-bold text-[#3d322b]">🏛 {ev.venueName}</p>
                    <p className="text-[#8c7462]">📍 {ev.venueAddress}</p>
                  </div>

                  {/* Actions: Add to Calendar, Download ICS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#f8f3ec] font-sans">
                    <a
                      href={buildGoogleCalendarUrl(ev, coupleDisplayName)}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-[#ba9269] hover:bg-[#a67e56] text-[#ffffff] text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>📅</span>
                      <span>{lang === 'ta' ? 'கூகுள் கேலெண்டரில் சேர்' : 'Add to Google Calendar'}</span>
                    </a>
                    <button
                      onClick={() => downloadICS(ev, coupleDisplayName)}
                      className="py-2.5 px-4 rounded-xl bg-[#f4ede2] hover:bg-[#eae0d2] border border-[#ba9269]/40 text-[#6d5032] text-xs font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>📥</span>
                      <span>{lang === 'ta' ? '.ICS பதிவிறக்கம்' : 'Download .ICS Calendar'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. ORGANIC BOTANICAL FLORAL MOSAIC GALLERY & LIGHTBOX */}
          <section id="gallery" className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#ba9269] block">
                ✦ {lang === 'ta' ? 'பூவிதழ் நினைவுகள்' : 'Botanical Moments'} ✦
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Floral Mosaic Gallery'}
              </h3>
              <p className="text-xs font-sans text-[#8c7462]">Click any blossom to view in full resolution</p>
            </div>

            {/* Organic Mosaic Layout with curved borders */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
              {galleryImages.map((src, idx) => {
                const cornerStyles = [
                  'rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg',
                  'rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg',
                  'rounded-3xl',
                  'rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg',
                  'rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg',
                  'rounded-3xl',
                ]
                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`aspect-[4/5] overflow-hidden border-2 border-[#ba9269]/40 bg-[#eae0d2] cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 relative ${cornerStyles[idx % cornerStyles.length]}`}
                  >
                    <img src={src} alt={`Blossom ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#3d322b]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#ffffff]/90 text-[#3d322b] text-xs px-3 py-1 rounded-full font-serif font-bold shadow-md">
                        🌿 Moment 0{idx + 1}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* LIGHTBOX MODAL WITH PREV / NEXT / COUNTER */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1411]/92 backdrop-blur-md cursor-pointer"
              onClick={() => setLightboxIndex(null)}
            >
              <div
                className="relative max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-[#ba9269]/50 shadow-2xl bg-black"
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
          <section id="venue" className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-xs space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'திருமண மண்டபம் மற்றும் வழிகாட்டி' : 'Venue & Directions'}
              </h3>
              <p className="text-xs text-[#8c7462]">Select event to view navigation and route details</p>
            </div>

            <div className="flex border-b border-[#ede3d5] overflow-x-auto gap-2">
              {events.map((ev, i) => (
                <button
                  key={ev.id || i}
                  onClick={() => setActiveVenueTab(i)}
                  className={`pb-2 px-3 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeVenueTab === i
                      ? 'border-b-2 border-[#a07c57] text-[#a07c57]'
                      : 'text-[#8c7462] hover:text-[#3d322b]'
                  }`}
                >
                  {ev.title}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#3d322b] text-sm">{events[activeVenueTab]?.venueName}</p>
                <p className="text-[#6e5d50]">{events[activeVenueTab]?.venueAddress}</p>
                <p className="text-[#a07c57] font-semibold">⏰ {events[activeVenueTab]?.date} • {events[activeVenueTab]?.time}</p>
              </div>

              {/* Embedded Interactive Map */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#e8ded0] bg-[#fbf8f4]">
                <iframe
                  title="Venue Map"
                  className="w-full h-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(events[activeVenueTab]?.venueAddress || events[activeVenueTab]?.venueName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                />
              </div>

              <div className="pt-1 flex gap-2">
                <a
                  href={events[activeVenueTab]?.mapsUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#3d322b] text-[#ffffff] font-semibold text-xs text-center transition hover:bg-[#52443b]"
                >
                  Open in Google Maps App ↗
                </a>
              </div>
            </div>
          </section>

          {/* 8. DIGITAL WEDDING GIFT / UPI COPY */}
          <section id="gifts" className="bg-gradient-to-br from-[#ffffff] to-[#faf5ee] p-6 rounded-3xl border border-[#e8ded0] shadow-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#f4ede2] text-[#a07c57] flex items-center justify-center text-xl mx-auto border border-[#e0d3c4]">
              🎁
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'மங்கல அன்பளிப்பு / டிஜிட்டல் பரிசு' : 'Wedding Gift & Shagun'}
              </h3>
              <p className="text-xs text-[#7a6759] mt-1 max-w-sm mx-auto">
                {lang === 'ta'
                  ? 'தங்கள் அன்பும் ஆசியுமே எங்களுக்கு பேரானந்தம். அன்பளிப்பு அனுப்ப விரும்புவோர்:'
                  : 'Your presence and prayers are our greatest gift. For those who wish to bless us digitally:'}
              </p>
            </div>

            <div className="bg-[#ffffff] p-4 rounded-2xl border border-[#ede3d5] max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8c7462]">UPI ID / GPay:</span>
                <span className="font-mono font-bold text-[#3d322b]">wedding.blessing@upi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c7462]">Account Holder:</span>
                <span className="font-semibold text-[#3d322b]">{couple.bride} & {couple.groom}</span>
              </div>
              <button
                onClick={() => handleCopy('wedding.blessing@upi', 't3-upi')}
                className="w-full mt-2 py-2 rounded-xl bg-[#f4ede2] hover:bg-[#eae0d2] text-[#6d5032] font-semibold text-xs transition cursor-pointer"
              >
                {copiedBank === 't3-upi' ? '✓ Copied UPI ID to Clipboard!' : 'Copy UPI ID / Account Number'}
              </button>
            </div>
          </section>

          {/* 9. WHATSAPP SHARE & RSVP */}
          <section id="rsvp" className="space-y-4">
            <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-xs text-center space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'அழைப்பிதழைப் பகிர்க' : 'Share With Loved Ones'}
              </h3>
              <p className="text-xs text-[#8c7462]">Share this online invitation link via WhatsApp with friends and family</p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleShareWhatsApp}
                  className="py-3 px-5 rounded-2xl bg-[#25D366] text-[#ffffff] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#20ba59] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>💬</span>
                  <span>Share on WhatsApp</span>
                </button>
                <button
                  onClick={() => handleCopy(window.location.href, 'link')}
                  className="py-3 px-5 rounded-2xl bg-[#f4ede2] text-[#6d5032] font-semibold text-xs transition cursor-pointer"
                >
                  {copiedBank === 'link' ? '✓ Copied Link!' : 'Copy Invitation Link'}
                </button>
              </div>
            </div>

            {/* RSVP Form */}
            <div className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-xs space-y-4">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#3d322b]">
                  {lang === 'ta' ? 'வருகை உறுதிப்படுத்தல் (RSVP)' : 'RSVP Confirmation'}
                </h3>
                <p className="text-xs text-[#8c7462]">Please let us know if you can join our celebration</p>
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
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#e8ded0] bg-[#faf5ee]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attendance: 'yes' })}
                      className={`py-2 rounded-xl font-semibold border ${
                        rsvpData.attendance === 'yes' ? 'bg-[#ba9269] text-white border-[#ba9269]' : 'border-[#e8ded0] text-[#7a6759]'
                      }`}
                    >
                      ✓ Joyfully Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, attendance: 'no' })}
                      className={`py-2 rounded-xl font-semibold border ${
                        rsvpData.attendance === 'no' ? 'bg-[#ba9269] text-white border-[#ba9269]' : 'border-[#e8ded0] text-[#7a6759]'
                      }`}
                    >
                      ✕ Regretfully Declining
                    </button>
                  </div>

                  <select
                    value={rsvpData.guests}
                    onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#e8ded0] bg-[#faf5ee]"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4+">Family (4+ Guests)</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ba9269] to-[#8a6540] text-white font-bold uppercase tracking-wider"
                  >
                    Submit RSVP
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* 10. WISHES & BLESSINGS WALL */}
          <section className="bg-[#ffffff] p-6 rounded-3xl border border-[#e8ded0] shadow-xs space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#3d322b]">
                {lang === 'ta' ? 'வாழ்த்துக்கள் மற்றும் ஆசிகள்' : 'Wishes & Blessings'}
              </h3>
              <p className="text-xs text-[#8c7462]">Send your personal love message to the couple</p>
            </div>

            <form onSubmit={handleWishSubmit} className="space-y-2.5 text-xs">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={newWish.name}
                onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#e8ded0] bg-[#faf5ee]"
              />
              <textarea
                rows={2}
                required
                placeholder="Your blessings and warm wishes..."
                value={newWish.text}
                onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#e8ded0] bg-[#faf5ee]"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#ba9269] text-white font-bold">
                Post Warm Greeting
              </button>
            </form>

            <div className="space-y-2 pt-2 max-h-56 overflow-y-auto">
              {wishes.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#faf5ee] border border-[#ede3d5] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#3d322b]">{w.name}</span>
                    <span className="text-[10px] text-[#8c7462]">{w.time}</span>
                  </div>
                  <p className="text-[#6e5d50]">{w.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 11. FOOTER & COUPLE SIGNATURE */}
          <footer className="text-center pt-8 border-t border-[#e8ded0] text-xs text-[#8c7462] space-y-2">
            <p className="font-serif font-bold text-lg text-[#3d322b]">{coupleDisplayName}</p>
            <p className="font-serif italic">
              {lang === 'ta' ? 'எங்கள் இல்லத் திருமண விழாவிற்கு வருகை தந்தருள வேண்டுகிறோம்.' : 'We eagerly look forward to welcoming you with warmth and joy.'}
            </p>
            <p className="text-[10px] text-[#a07c57] tracking-widest uppercase font-mono pt-2">
              {couple.hashtag}
            </p>
          </footer>
        </main>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR */}
      {opened && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-t border-[#e8ded0] py-2 px-3 flex justify-around items-center max-w-xl mx-auto shadow-2xl">
          <a href="#home" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>🏠</span>
            <span>Home</span>
          </a>
          <a href="#story" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>📖</span>
            <span>Story</span>
          </a>
          <a href="#events" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>📅</span>
            <span>Events</span>
          </a>
          <a href="#gallery" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>🖼</span>
            <span>Gallery</span>
          </a>
          <a href="#venue" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>📍</span>
            <span>Venue</span>
          </a>
          <a href="#rsvp" className="text-center text-[10px] text-[#7a6759] hover:text-[#ba9269] flex flex-col items-center">
            <span>💌</span>
            <span>RSVP</span>
          </a>
        </nav>
      )}
    </div>
  )
}
