import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildGoogleCalendarUrl, downloadICS } from '../../../utils/calendar'
import { buildWhatsAppUrl } from '../../../utils/whatsapp'
import LotusOpeningScreen from '../../opening/LotusOpeningScreen'
import LoveHeartOpeningScreen from '../../opening/LoveHeartOpeningScreen'

export default function Template05({ invitationData }) {
  const [opened, setOpened] = useState(false)
  const [openingTheme, setOpeningTheme] = useState('lotus')
  const [opening, setOpening] = useState(false)
  const [lang, setLang] = useState('en')
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [activeVenueTab, setActiveVenueTab] = useState(0)
  const [activeGallerySlide, setActiveGallerySlide] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [copiedBank, setCopiedBank] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpData, setRsvpData] = useState({ name: '', attendance: 'yes', guests: '2', notes: '' })
  const [wishes, setWishes] = useState([
    { name: 'Sanjay & Kavitha', message: 'May your union be blessed with joy, laughter, and endless light!', time: '10 mins ago' },
    { name: 'Dr. Anand & Family', message: 'Heartiest congratulations! Looking forward to celebrating this beautiful milestone with you.', time: '1 hour ago' },
  ])
  const [wishName, setWishName] = useState('')
  const [wishMsg, setWishMsg] = useState('')

  const audioRef = useRef(null)
  const starCanvasRef = useRef(null)

  // Couple Data
  const couple = useMemo(() => {
    return {
      bride: invitationData?.brideName || 'Amaya',
      groom: invitationData?.groomName || 'Rohan',
      brideTamil: invitationData?.brideNameTamil || 'அமயா',
      groomTamil: invitationData?.groomNameTamil || 'ரோஹன்',
      parentsBride: invitationData?.parents?.bride || 'Mr. & Mrs. Wickramasinghe',
      parentsGroom: invitationData?.parents?.groom || 'Mr. & Mrs. Senanayake',
      hashtag: invitationData?.hashtag || '#AmayaAndRohan2026',
      heroImage: invitationData?.photos?.couple || '/images/hero-couple.jpg',
      brideImage: invitationData?.photos?.bride || '/images/gallery-photo-1.jpg',
      groomImage: invitationData?.photos?.groom || '/images/gallery-photo-2.jpg',
      musicUrl: invitationData?.musicUrl || '/music.mp3',
      rsvpPhone: invitationData?.rsvpPhone || '+94 77 123 4567',
      customEnglish: invitationData?.messages?.customEnglish || 'Join us as we step into our forever surrounded by the people we love the most.',
      customTamil: invitationData?.messages?.customTamil || 'எங்கள் வாழ்வின் இந்த இனிய தொடக்கத்திற்கு தாங்களும் தங்கள் குடும்பத்தாரும் வருகை தந்து வாழ்த்த வேண்டுகிறோம்.',
    }
  }, [invitationData])

  const events = useMemo(() => {
    if (Array.isArray(invitationData?.events) && invitationData.events.length > 0) {
      return invitationData.events
    }
    return [
      {
        id: 'ceremony',
        title: 'Marriage Solemnization',
        titleTamil: 'திருமண சடங்கு',
        time: '10:00 AM',
        date: '2026-11-28',
        venueName: "St. Mary's Church",
        venueNameTamil: 'செயின்ட் மேரிஸ் தேவாலயம்',
        venueAddress: 'Galle Road, Colombo Waterfront',
        venueAddressTamil: 'காலி ரோடு, கொழும்பு',
        mapsUrl: 'https://maps.google.com/?q=St+Marys+Church+Colombo',
        image: '/images/story-1.jpg',
      },
      {
        id: 'reception',
        title: 'Grand Banquet Dinner',
        titleTamil: 'மங்கல இரவு விருந்து',
        time: '07:00 PM',
        date: '2026-11-28',
        venueName: 'The Kingsbury Grand Ballroom',
        venueNameTamil: 'தி கிங்ஸ்பரி ஹோட்டல்',
        venueAddress: 'Colombo Waterfront, Colombo',
        venueAddressTamil: 'கொழும்பு வாட்டர்பிரண்ட்',
        mapsUrl: 'https://maps.google.com/?q=The+Kingsbury+Colombo',
        image: '/images/story-2.jpg',
      },
    ]
  }, [invitationData])

  const galleryImages = [
    invitationData?.photos?.couple || '/images/hero-couple.jpg',
    invitationData?.photos?.bride || '/images/gallery-photo-1.jpg',
    invitationData?.photos?.groom || '/images/gallery-photo-2.jpg',
    '/images/story-1.jpg',
    '/images/story-2.jpg',
    '/images/story-3.jpg',
  ]

  // Dynamic Aurora & Stardust Canvas Effect
  useEffect(() => {
    const canvas = starCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: ['#c084fc', '#38bdf8', '#f472b6', '#818cf8', '#e879f9'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }))

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.01

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha))
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Live countdown
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const target = new Date(`${events[0]?.date || '2026-11-28'}T10:00:00`).getTime()
    const timer = setInterval(() => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setTimeLeft({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [events])

  const handleOpenInvitation = () => {
    setOpening(true)
    setTimeout(() => {
      setOpened(true)
      try {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {})
          setIsMusicPlaying(true)
        }
      } catch {}
    }, 700)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text)
    setCopiedBank(key)
    setTimeout(() => setCopiedBank(null), 2500)
  }

  const handleWishSubmit = (e) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMsg.trim()) return
    setWishes([{ name: wishName.trim(), message: wishMsg.trim(), time: 'Just Now' }, ...wishes])
    setWishName('')
    setWishMsg('')
  }

  const handleRsvpSubmit = (e) => {
    e.preventDefault()
    if (!rsvpData.name.trim()) return
    setRsvpDone(true)
  }

  const shareInvitation = () => {
    const text = `✨ Wedding Invitation ✨\nJoin us in celebrating the wedding of ${couple.bride} & ${couple.groom}!\n\n📅 Date: ${events[0]?.date}\n🏛 Venue: ${events[0]?.venueName}\n\nView our digital invitation here:\n${window.location.href}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
  }

  const loveMilestones = [
    {
      title: lang === 'en' ? 'First Encounter' : 'முதல் சந்திப்பு',
      date: 'Autumn 2023',
      desc: lang === 'en' ? 'A serendipitous evening meeting under city lights that blossomed into an inseparable bond.' : 'ஒரு இனிய மாலை வேளையில் மலர்ந்த அழகான அறிமுகம் மற்றும் நட்பு.',
      icon: '✨',
    },
    {
      title: lang === 'en' ? 'The Starlit Proposal' : 'காதல் வாக்குறுதி',
      date: 'New Year Eve 2024',
      desc: lang === 'en' ? 'Under glowing fireworks, two hearts promised a lifetime of companionship together.' : 'விண்மீன்கள் நிறைந்த வானத்தின் கீழ் என்றென்றும் பிரியாதிருக்க செய்த அன்பு வாக்குறுதி.',
      icon: '💍',
    },
    {
      title: lang === 'en' ? 'Two Families As One' : 'குடும்பங்களின் ஆசி',
      date: 'Summer 2025',
      desc: lang === 'en' ? 'Both families blessed our journey with warmth, prayers, and celebratory dinner.' : 'இரு குடும்பப் பெரியோர்களின் ஆசிகளுடன் மங்கலமாக முடிவான திருமண ஏற்பாடு.',
      icon: '🕊',
    },
    {
      title: lang === 'en' ? 'The Big Day' : 'திருமண நன்னாள்',
      date: events[0]?.date || '2026-11-28',
      desc: lang === 'en' ? 'We begin our eternal journey hand-in-hand surrounded by all of our loved ones.' : 'அனைவரது நல்லாசிகளுடன் தொடங்கவுள்ள எங்களின் இனிய இல்லற வாழ்வு.',
      icon: '👑',
    },
  ]

  const faqs = [
    {
      q: lang === 'en' ? 'What is the recommended dress code?' : 'ஆடை அலங்கார வழிகாட்டுதல் என்ன?',
      a: lang === 'en' ? 'Guests are warmly encouraged to wear shades of Royal Purple, Indigo, Champagne, and Midnight Blue.' : 'ராயல் பர்ப்பிள், நீலம் அல்லது கோல்டன் நிற ஆடைகளை அணிய அன்போடு கேட்டுக்கொள்ளப்படுகிறீர்கள்.',
    },
    {
      q: lang === 'en' ? 'Is valet parking available at the venue?' : 'வாகனம் நிறுத்தும் வசதி உள்ளதா?',
      a: lang === 'en' ? 'Yes, complimentary dedicated valet parking and spacious basement lots are arranged at both venues.' : 'ஆம், இரு நிகழ்விடங்களிலும் இலவச வாகன நிறுத்துமிடம் ஏற்பாடு செய்யப்பட்டுள்ளது.',
    },
    {
      q: lang === 'en' ? 'How can I send my blessings or gift digitally?' : 'வாழ்த்துகளையோ அன்பளிப்பையோ எவ்வாறு வழங்கலாம்?',
      a: lang === 'en' ? 'You may post your wish directly on our Live Wishing Wall or use the secure UPI & Bank details provided below.' : 'கீழே உள்ள வாழ்த்துச் சுவரில் எழுதலாம் அல்லது UPI / வங்கி மூலமாக வழங்கலாம்.',
    },
  ]

  return (
    <div className="template-05-container min-h-screen bg-gradient-to-br from-[#070913] via-[#100720] to-[#1a0833] text-[#ffffff] font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white relative">
      <audio ref={audioRef} loop src={couple.musicUrl} />

      {/* Floating Stardust Canvas Background */}
      <canvas ref={starCanvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* 1. ANIMATED LOTUS / LOVE HEART INVITATION OPENING EXPERIENCE */}
      {!opened && (
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
              onOpen={handleOpenInvitation}
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
            <LoveHeartOpeningScreen
              onOpen={handleOpenInvitation}
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

      {/* 2. MAIN SCROLLABLE APP (SPACIOUS, CLEAN, BREATHABLE) */}
      {opened && (
        <div className="relative z-20 min-h-screen pb-28">
          {/* TOP STICKY NAVBAR */}
          <nav className="sticky top-0 z-40 bg-[#0c0817]/90 backdrop-blur-2xl border-b border-purple-500/20 px-4 sm:px-6 py-3.5 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-serif font-bold text-sm sm:text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-xs font-bold text-cyan-300 transition cursor-pointer"
              >
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>

              {/* WhatsApp Share */}
              <button
                onClick={shareInvitation}
                className="h-8 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5 text-xs hover:bg-emerald-500/30 transition cursor-pointer"
                title="Share via WhatsApp"
              >
                <span>💬</span>
                <span className="hidden sm:inline">Share</span>
              </button>

              {/* Music Toggle */}
              <button
                onClick={toggleMusic}
                className="w-8 h-8 rounded-xl bg-purple-500/25 border border-purple-500/50 text-purple-200 flex items-center justify-center text-xs hover:bg-purple-500/40 transition cursor-pointer"
                title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isMusicPlaying ? '❚❚' : '🎵'}
              </button>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20 sm:space-y-24">
            {/* HERO SECTION */}
            <section id="home" className="relative bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-purple-500/30 shadow-[0_15px_50px_rgba(147,51,234,0.25)] text-center space-y-6 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-semibold uppercase tracking-[0.25em]">
                {lang === 'en' ? 'The Wedding Celebration' : 'மங்கல திருமண அழைப்பிதழ்'}
              </span>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 tracking-wide">
                {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
              </h1>

              <p className="text-xs font-semibold tracking-widest text-cyan-300 uppercase">
                {couple.hashtag}
              </p>

              {/* Couple Hero Photo */}
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-[4/5] max-w-md group">
                <img
                  src={couple.heroImage}
                  alt="Couple"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0517]/85 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <p className="text-purple-200 text-xs sm:text-sm italic text-center w-full leading-relaxed">
                    "{lang === 'en' ? couple.customEnglish : couple.customTamil}"
                  </p>
                </div>
              </div>

              {/* Date & Location Pill */}
              <div className="py-3.5 px-6 rounded-2xl bg-black/50 border border-white/15 text-cyan-300 font-semibold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-lg mx-auto shadow-md">
                <span>📅 {events[0]?.date}</span>
                <span className="hidden sm:inline text-purple-400">•</span>
                <span>📍 {lang === 'en' ? events[0]?.venueName : events[0]?.venueNameTamil || events[0]?.venueName}</span>
              </div>
            </section>

            {/* LIVE COUNTDOWN */}
            <section className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 text-center space-y-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'The Countdown' : 'காலக் கணிப்பு'} ✦
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                  {lang === 'en' ? 'Time Until Forever Begins' : 'திருமண நன்னாளுக்கான நேரம்'}
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
                <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border border-purple-500/25 shadow-inner">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white block">{timeLeft.d}</span>
                  <span className="text-[11px] text-purple-300 uppercase font-bold tracking-wider">{lang === 'en' ? 'Days' : 'நாட்கள்'}</span>
                </div>
                <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border border-purple-500/25 shadow-inner">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white block">{timeLeft.h}</span>
                  <span className="text-[11px] text-purple-300 uppercase font-bold tracking-wider">{lang === 'en' ? 'Hours' : 'மணி'}</span>
                </div>
                <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border border-purple-500/25 shadow-inner">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white block">{timeLeft.m}</span>
                  <span className="text-[11px] text-purple-300 uppercase font-bold tracking-wider">{lang === 'en' ? 'Mins' : 'நிமிடம்'}</span>
                </div>
                <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border border-purple-500/25 shadow-inner">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-cyan-300 block">{timeLeft.s}</span>
                  <span className="text-[11px] text-cyan-300 uppercase font-bold tracking-wider">{lang === 'en' ? 'Secs' : 'நொடி'}</span>
                </div>
              </div>
            </section>

            {/* LOVE STORY / MILESTONES */}
            <section id="story" className="space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-purple-400 block">
                  ✦ {lang === 'en' ? 'Our Cosmic Journey' : 'எங்கள் காதல் பயணம்'} ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'How It All Began' : 'நினைவுத் துளிகள்'}
                </h3>
              </div>

              <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
                {loveMilestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-sm shadow-lg border-2 border-[#120722]">
                      {m.icon}
                    </span>
                    <div className="bg-white/[0.06] backdrop-blur-xl p-6 rounded-2xl border border-white/10 group-hover:border-purple-400/40 transition space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-lg text-purple-200">{m.title}</h4>
                        <span className="text-xs text-cyan-300 bg-cyan-950/60 px-3 py-0.5 rounded-full border border-cyan-500/30 w-fit">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ATTIRE GUIDE */}
            <section id="attire" className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs text-pink-300 font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'Theme & Attire Guide' : 'ஆடை வழிகாட்டுதல்'} ✦
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {lang === 'en' ? 'Dress in Harmony' : 'விருந்தினர் ஆடை பரிந்துரைகள்'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-black/40 p-5 rounded-2xl border border-purple-500/25 space-y-2 text-center">
                  <span className="inline-block bg-purple-600/30 text-purple-300 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Solemnization Look' : 'திருமண சடங்கு'}
                  </span>
                  <p className="text-gray-200 leading-relaxed">
                    {lang === 'en'
                      ? 'Elegant Ivory & Gold silks, Traditional formal attire with soft pastels.'
                      : 'பாரம்பரிய பட்டு உடைகள் மற்றும் மிதமான நேர்த்தியான வண்ணங்கள்.'}
                  </p>
                </div>
                <div className="bg-black/40 p-5 rounded-2xl border border-pink-500/25 space-y-2 text-center">
                  <span className="inline-block bg-pink-600/30 text-pink-300 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Grand Banquet Evening' : 'மங்கல வரவேற்பு இரவு'}
                  </span>
                  <p className="text-gray-200 leading-relaxed">
                    {lang === 'en'
                      ? 'Royal Purple, Midnight Blue, Tuxedos, Chic Evening Gowns & Kurtas.'
                      : 'ராயல் பர்ப்பிள், நீலம், கோல்டன் மாலை நேர ஆடை அலங்காரங்கள்.'}
                  </p>
                </div>
              </div>

              {/* Swatches */}
              <div className="pt-2 text-center space-y-2">
                <p className="text-xs text-gray-400">
                  {lang === 'en' ? 'Curated Celestial Color Palette:' : 'தேர்ந்தெடுக்கப்பட்ட வண்ணங்கள்:'}
                </p>
                <div className="flex justify-center items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#3b0764] border-2 border-white/20 shadow-md" title="Royal Purple" />
                  <div className="w-7 h-7 rounded-full bg-[#1e1b4b] border-2 border-white/20 shadow-md" title="Midnight Indigo" />
                  <div className="w-7 h-7 rounded-full bg-[#fde047] border-2 border-white/20 shadow-md" title="Champagne Gold" />
                  <div className="w-7 h-7 rounded-full bg-[#f472b6] border-2 border-white/20 shadow-md" title="Rose Gold" />
                  <div className="w-7 h-7 rounded-full bg-[#38bdf8] border-2 border-white/20 shadow-md" title="Starlight Cyan" />
                </div>
              </div>
            </section>

            {/* CEREMONIES & SCHEDULE WITH HIGH-CONTRAST ACTION BUTTONS */}
            <section id="events" className="space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase block">
                  ✦ {lang === 'en' ? 'Sacred Moments' : 'மங்கல நிகழ்வுகள்'} ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'Celebration Itinerary' : 'நிகழ்ச்சி நிரல்'}
                </h3>
              </div>

              <div className="space-y-6">
                {events.map((ev, idx) => {
                  const googleCalUrl = buildGoogleCalendarUrl(ev, `${couple.bride} & ${couple.groom}`)
                  return (
                    <div
                      key={ev.id || idx}
                      className="bg-white/[0.06] backdrop-blur-2xl p-7 sm:p-8 rounded-3xl border border-white/15 hover:border-purple-400/40 transition space-y-5 shadow-xl"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-white/10 pb-4">
                        <div>
                          <span className="inline-block bg-purple-500/25 text-purple-300 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-1.5 border border-purple-400/30">
                            {idx === 0 ? (lang === 'en' ? 'Solemnization' : 'திருமண சடங்கு') : (lang === 'en' ? 'Celebration' : 'வரவேற்பு')}
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-bold text-white">
                            {lang === 'en' ? ev.title : ev.titleTamil || ev.title}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-4 py-2 rounded-full border border-cyan-500/40 w-fit">
                          ⏰ {ev.time}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                        <p className="font-bold text-white">📅 {ev.date}</p>
                        <p className="font-bold text-purple-300">🏛 {lang === 'en' ? ev.venueName : ev.venueNameTamil || ev.venueName}</p>
                        <p className="text-gray-400">📍 {lang === 'en' ? ev.venueAddress : ev.venueAddressTamil || ev.venueAddress}</p>
                      </div>

                      {/* Prominent Action Buttons */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={googleCalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                        >
                          <span>📅</span>
                          <span>{lang === 'en' ? 'Add to Google Calendar' : 'கூகுள் கேலெண்டரில் சேர்'}</span>
                        </a>

                        <button
                          onClick={() => downloadICS(ev, `${couple.bride} & ${couple.groom}`)}
                          className="py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>📥</span>
                          <span>{lang === 'en' ? 'Download .ICS (Apple & Outlook)' : '.ICS கேலெண்டர் பதிவிறக்கம்'}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* TABBED VENUE SELECTOR WITH GOOGLE MAPS IFRAME */}
            <section id="venue" className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400 block">
                  ✦ {lang === 'en' ? 'Interactive Navigation' : 'நிகழ்விட வரைபடம்'} ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'Find Your Way to the Venue' : 'நிகழ்விட வழிகாட்டி'}
                </h3>
              </div>

              {/* Venue Tabs */}
              <div className="flex p-1.5 bg-black/50 rounded-2xl border border-white/10">
                {events.map((ev, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVenueTab(i)}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                      activeVenueTab === i
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? ev.title : ev.titleTamil || ev.title}
                  </button>
                ))}
              </div>

              {/* Active Venue Details */}
              {events[activeVenueTab] && (
                <div className="space-y-4">
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10 space-y-1.5">
                    <h4 className="font-bold text-lg sm:text-xl text-purple-300">
                      {lang === 'en'
                        ? events[activeVenueTab].venueName
                        : events[activeVenueTab].venueNameTamil || events[activeVenueTab].venueName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                      📍 {lang === 'en'
                        ? events[activeVenueTab].venueAddress
                        : events[activeVenueTab].venueAddressTamil || events[activeVenueTab].venueAddress}
                    </p>
                    <p className="text-xs text-cyan-300 font-bold">⏰ {events[activeVenueTab].time}</p>
                  </div>

                  {/* Embedded Google Map Iframe */}
                  <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl h-72 sm:h-80 w-full bg-slate-900">
                    <iframe
                      title="Venue Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        events[activeVenueTab].venueName + ' ' + events[activeVenueTab].venueAddress
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>

                  {/* High Visibility Directions Button */}
                  <a
                    href={events[activeVenueTab].mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(events[activeVenueTab].venueName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider text-center shadow-lg hover:scale-[1.01] transition"
                  >
                    📍 {lang === 'en' ? 'Open in Google Maps App ↗' : 'கூகுள் மேப்பில் பார்க்க ↗'}
                  </a>
                </div>
              )}
            </section>

            {/* CREATIVE INTERACTIVE FILMSTRIP CAROUSEL GALLERY */}
            <section id="gallery" className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-pink-400 block">
                  ✦ {lang === 'en' ? 'Captured Moments' : 'புகைப்படத் தொகுப்பு'} ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'Interactive Photo Filmstrip' : 'காதல் தருணங்கள்'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'en' ? 'Slide or tap thumbnails below to explore moments' : 'பெரிதாக்கிப் பார்க்க புகைப்படத்தைத் தொடவும்'}
                </p>
              </div>

              {/* Main Active Featured Slide */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-900 group">
                <img
                  src={galleryImages[activeGallerySlide]}
                  alt={`Slide ${activeGallerySlide + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => setLightboxIndex(activeGallerySlide)}
                />

                {/* Slide Controls */}
                <button
                  onClick={() => setActiveGallerySlide((activeGallerySlide - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-bold border border-white/20 transition cursor-pointer"
                  title="Previous Slide"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveGallerySlide((activeGallerySlide + 1) % galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-bold border border-white/20 transition cursor-pointer"
                  title="Next Slide"
                >
                  ›
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 inset-x-4 flex justify-between items-center pointer-events-none">
                  <span className="bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300 border border-white/10">
                    Moment {activeGallerySlide + 1} of {galleryImages.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(activeGallerySlide)}
                    className="pointer-events-auto bg-purple-600/80 hover:bg-purple-600 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white border border-purple-400/40 transition cursor-pointer"
                  >
                    🔍 Zoom Fullscreen
                  </button>
                </div>
              </div>

              {/* Horizontal Thumbnail Selector Filmstrip */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {galleryImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallerySlide(i)}
                    className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeGallerySlide === i
                        ? 'border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-105'
                        : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* FAMILY BLESSINGS & LINEAGE */}
            <section className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 text-center">
              <div className="space-y-1">
                <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'Family Lineage & Blessings' : 'பெரியோர்களின் ஆசிகள்'} ✦
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {lang === 'en' ? 'With the Blessings of Our Families' : 'குடும்பப் பெரியோர்களின் நல்வாழ்த்துகள்'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-black/40 p-6 rounded-2xl border border-purple-500/25 space-y-2">
                  <span className="text-purple-300 font-bold text-sm block">
                    {lang === 'en' ? "Bride's Family" : 'மணமகள் இல்லத்தார்'}
                  </span>
                  <p className="text-gray-200 font-semibold text-sm">{couple.parentsBride}</p>
                  <p className="text-gray-400 italic pt-1">
                    "{lang === 'en' ? 'Wishing both a lifetime of love and joy.' : 'எல்லா நலன்களும் பெற்று வாழ்க.'}"
                  </p>
                </div>
                <div className="bg-black/40 p-6 rounded-2xl border border-pink-500/25 space-y-2">
                  <span className="text-pink-300 font-bold text-sm block">
                    {lang === 'en' ? "Groom's Family" : 'மணமகன் இல்லத்தார்'}
                  </span>
                  <p className="text-gray-200 font-semibold text-sm">{couple.parentsGroom}</p>
                  <p className="text-gray-400 italic pt-1">
                    "{lang === 'en' ? 'May your union illuminate every tomorrow.' : 'இல்லறம் சிறக்க எங்கள் நல்லாசிகள்.'}"
                  </p>
                </div>
              </div>
            </section>

            {/* DIGITAL SHAGUN / UPI & GIFT REGISTRY */}
            <section className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-cyan-500/30 space-y-6 text-center shadow-2xl">
              <div className="space-y-1">
                <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'Digital Shagun / Gift Registry' : 'மங்கல அன்பளிப்பு'} ✦
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {lang === 'en' ? 'Send Your Blessings' : 'நல்வாழ்த்துகள் & அன்பளிப்பு'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Your presence is our most cherished present! For guests wishing to send a token of love digitally:'
                  : 'தங்களின் வருகையே எங்களின் மிகப்பெரிய பரிசு! அன்பளிப்பினை டிஜிட்டல் முறையில் வழங்க விரும்பினால்:'}
              </p>

              <div className="bg-black/50 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-purple-950/50 p-4 rounded-xl border border-purple-500/40">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">UPI ID</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300">wed.amaya.rohan@upi</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('wed.amaya.rohan@upi', 'upi')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    {copiedBank === 'upi' ? (lang === 'en' ? '✓ Copied!' : '✓ நகலெடுக்கப்பட்டது!') : (lang === 'en' ? '📋 Copy UPI' : '📋 நகலெடு')}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-purple-950/50 p-4 rounded-xl border border-purple-500/40">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Bank Account & IFSC</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-gray-200">A/C: 987654321098 • HDFC0001234</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('987654321098 IFSC: HDFC0001234', 'acc')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    {copiedBank === 'acc' ? (lang === 'en' ? '✓ Copied!' : '✓ நகலெடுக்கப்பட்டது!') : (lang === 'en' ? '📋 Copy Details' : '📋 நகலெடு')}
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE RSVP FORM */}
            <section id="rsvp" className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-purple-500/30 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-pink-400 block">
                  ✦ RSVP ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'Will You Grace Us?' : 'வருகையை உறுதிப்படுத்துங்கள்'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'en' ? 'Kindly confirm your attendance by Nov 20, 2026' : 'நிகழ்வில் தாங்கள் கலந்துகொள்வதை உறுதிசெய்யவும்'}
                </p>
              </div>

              {rsvpDone ? (
                <div className="bg-emerald-950/50 border border-emerald-500/50 p-8 rounded-2xl text-center space-y-3">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-lg font-bold text-emerald-300">
                    {lang === 'en' ? 'Thank You for Confirming!' : 'நன்றி! உங்கள் வருகை உறுதி செய்யப்பட்டது'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {lang === 'en'
                      ? 'We eagerly await celebrating our special milestone with you.'
                      : 'உங்களை மகிழ்ச்சியோடு வரவேற்க ஆவலுடன் காத்திருக்கிறோம்.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs max-w-xl mx-auto">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">{lang === 'en' ? 'Your Full Name' : 'உங்கள் பெயர்'}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh & Family"
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      className="w-full bg-black/50 text-white p-3.5 rounded-xl border border-white/15 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">{lang === 'en' ? 'Attendance Status' : 'வருகை நிலை'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: 'yes' })}
                        className={`py-3 rounded-xl font-bold border transition cursor-pointer ${
                          rsvpData.attendance === 'yes'
                            ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                            : 'bg-black/40 border-white/15 text-gray-400'
                        }`}
                      >
                        ✓ {lang === 'en' ? 'Attending with Joy' : 'மகிழ்ச்சியுடன் வருகிறோம்'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: 'no' })}
                        className={`py-3 rounded-xl font-bold border transition cursor-pointer ${
                          rsvpData.attendance === 'no'
                            ? 'bg-rose-600 border-rose-400 text-white shadow-lg'
                            : 'bg-black/40 border-white/15 text-gray-400'
                        }`}
                      >
                        ✕ {lang === 'en' ? 'Regretfully Cannot' : 'வர இயலவில்லை'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">{lang === 'en' ? 'Total Number of Guests' : 'விருந்தினர் எண்ணிக்கை'}</label>
                    <select
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                      className="w-full bg-black/50 text-white p-3.5 rounded-xl border border-white/15 focus:outline-none focus:border-purple-400"
                    >
                      <option value="1">1 {lang === 'en' ? 'Guest' : 'நபர்'}</option>
                      <option value="2">2 {lang === 'en' ? 'Guests' : 'நபர்கள்'}</option>
                      <option value="3">3 {lang === 'en' ? 'Guests' : 'நபர்கள்'}</option>
                      <option value="4+">4+ {lang === 'en' ? 'Guests (Family)' : 'நபர்கள் (குடும்பத்துடன்)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">{lang === 'en' ? 'Congratulatory Note / Diet' : 'வாழ்த்துச் செய்தி / குறிப்பு'}</label>
                    <textarea
                      rows={2}
                      placeholder={lang === 'en' ? 'Looking forward to the celebration...' : 'உங்கள் நல்வாழ்த்து...'}
                      value={rsvpData.notes}
                      onChange={(e) => setRsvpData({ ...rsvpData, notes: e.target.value })}
                      className="w-full bg-black/50 text-white p-3.5 rounded-xl border border-white/15 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold uppercase tracking-wider shadow-lg cursor-pointer hover:scale-[1.01] transition"
                  >
                    {lang === 'en' ? 'Submit RSVP Confirmation' : 'வருகையை உறுதிசெய்'}
                  </button>

                  {/* Direct WhatsApp RSVP */}
                  {couple.rsvpPhone && (
                    <a
                      href={buildWhatsAppUrl(
                        couple.rsvpPhone,
                        `Hi ${couple.bride} & ${couple.groom}! I am delighted to confirm my RSVP for your wedding celebration. Looking forward!`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center py-2 text-cyan-300 font-bold hover:underline"
                    >
                      💬 {lang === 'en' ? 'Or RSVP directly via WhatsApp' : 'வாட்ஸ்அப் மூலம் உடனடியாக உறுதிசெய்ய'}
                    </a>
                  )}
                </form>
              )}
            </section>

            {/* LIVE WISHING WALL */}
            <section id="wishes" className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-pink-500/30 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-pink-400 block">
                  ✦ {lang === 'en' ? 'Warm Blessings' : 'வாழ்த்துச் சுவர்'} ✦
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {lang === 'en' ? 'Live Wishing Wall' : 'உங்கள் வாழ்த்துகளைப் பகிருங்கள்'}
                </h3>
              </div>

              <form onSubmit={handleWishSubmit} className="space-y-3 max-w-xl mx-auto">
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'}
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  className="w-full bg-black/50 text-white text-xs p-3.5 rounded-xl border border-white/15 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  rows={2}
                  required
                  placeholder={lang === 'en' ? 'Write your warm blessings for the couple...' : 'மணமக்களுக்கான நல்வாழ்த்து...'}
                  value={wishMsg}
                  onChange={(e) => setWishMsg(e.target.value)}
                  className="w-full bg-black/50 text-white text-xs p-3.5 rounded-xl border border-white/15 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  {lang === 'en' ? 'Post Blessing' : 'வாழ்த்தைப் பதிவிடவும்'}
                </button>
              </form>

              <div className="space-y-3 pt-2 max-h-72 overflow-y-auto max-w-xl mx-auto">
                {wishes.map((w, idx) => (
                  <div key={idx} className="bg-purple-950/50 p-4 rounded-2xl border border-purple-500/25 text-xs space-y-1 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-cyan-300">{w.name}</span>
                      <span className="text-[10px] text-gray-400">{w.time}</span>
                    </div>
                    <p className="text-gray-200">{w.message}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQS ACCORDION */}
            <section className="bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/15 space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-white">
                {lang === 'en' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
              </h3>
              <div className="divide-y divide-white/10 max-w-xl mx-auto">
                {faqs.map((f, i) => (
                  <div key={i} className="py-3.5">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center text-left text-xs sm:text-sm font-bold text-gray-200 cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <span className="text-purple-400 text-base">{openFaq === i ? '▲' : '▼'}</span>
                    </button>
                    {openFaq === i && (
                      <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed pl-3 border-l-2 border-purple-500">
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center pt-8 border-t border-white/10 text-xs text-gray-400 space-y-2">
              <p className="font-serif font-bold text-xl text-white">
                {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
              </p>
              <p>{lang === 'en' ? 'With love and heartfelt gratitude for celebrating with us.' : 'வருகை தந்து வாழ்த்தும் அனைத்து நல்நெஞ்சங்களுக்கும் மனமார்ந்த நன்றிகள்.'}</p>
              <p className="text-[11px] text-purple-400 font-semibold">{couple.hashtag}</p>
            </footer>
          </div>

          {/* STICKY BOTTOM MOBILE NAVIGATION BAR */}
          <div className="fixed bottom-3 inset-x-4 max-w-lg mx-auto z-40 bg-[#0e071c]/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl py-2.5 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex justify-around items-center text-[10px]">
            <a href="#home" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">🏠</span>
              <span>{lang === 'en' ? 'Home' : 'முகப்பு'}</span>
            </a>
            <a href="#story" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">📖</span>
              <span>{lang === 'en' ? 'Story' : 'பயணம்'}</span>
            </a>
            <a href="#events" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">📅</span>
              <span>{lang === 'en' ? 'Events' : 'நிகழ்வுகள்'}</span>
            </a>
            <a href="#venue" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">📍</span>
              <span>{lang === 'en' ? 'Venue' : 'வரைபடம்'}</span>
            </a>
            <a href="#gallery" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">📷</span>
              <span>{lang === 'en' ? 'Photos' : 'படங்கள்'}</span>
            </a>
            <a href="#rsvp" className="flex flex-col items-center text-gray-300 hover:text-purple-300">
              <span className="text-sm">✉</span>
              <span>RSVP</span>
            </a>
            <a href="#wishes" className="flex flex-col items-center text-pink-300 hover:text-pink-200">
              <span className="text-sm">♥</span>
              <span>{lang === 'en' ? 'Wishes' : 'வாழ்த்து'}</span>
            </a>
          </div>

          {/* FULLSCREEN LIGHTBOX WITH PREV / NEXT / COUNTER / CLOSE */}
          {lightboxIndex !== null && (
            <div
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-purple-500/40 shadow-2xl bg-black"
              >
                <img
                  src={galleryImages[lightboxIndex]}
                  alt="Enlarged moment"
                  className="w-full h-full max-h-[75vh] object-contain mx-auto"
                />

                <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs text-white font-sans font-bold">
                  <span className="bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    Photo {lightboxIndex + 1} / {galleryImages.length}
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
        </div>
      )}
    </div>
  )
}
