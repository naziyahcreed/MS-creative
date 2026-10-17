import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildGoogleCalendarUrl, downloadICS } from '../../../utils/calendar'
import { buildWhatsAppUrl } from '../../../utils/whatsapp'
import LotusOpeningScreen from '../../opening/LotusOpeningScreen'
import LoveHeartOpeningScreen from '../../opening/LoveHeartOpeningScreen'

export default function Template06({ invitationData }) {
  const [opened, setOpened] = useState(false)
  const [openingTheme, setOpeningTheme] = useState('love')
  const [opening, setOpening] = useState(false)
  const [lang, setLang] = useState('en')
  const [musicOn, setMusicOn] = useState(false)
  const [activeVenueTab, setActiveVenueTab] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [copiedBank, setCopiedBank] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpData, setRsvpData] = useState({ name: '', attendance: 'yes', guests: '2', notes: '' })
  const [wishes, setWishes] = useState([
    { name: 'Suresh & Malathi', message: 'May your shared path be filled with joy, prosperity, and unending love!', time: 'Today' },
    { name: 'Anitha Rajan & Family', message: 'Heartiest congratulations to the radiant couple! Looking forward to the grand celebration.', time: 'Yesterday' },
  ])
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')

  const audioRef = useRef(null)
  const petalCanvasRef = useRef(null)

  // Couple Data
  const couple = useMemo(() => {
    return {
      bride: invitationData?.brideName || 'Roshni',
      groom: invitationData?.groomName || 'Rahul',
      brideTamil: invitationData?.brideNameTamil || 'ரோஷினி',
      groomTamil: invitationData?.groomNameTamil || 'ராஹுல்',
      parentsBride: invitationData?.parents?.bride || 'Daughter of Mr. & Mrs. Rajesh Sharma',
      parentsGroom: invitationData?.parents?.groom || 'Son of Mr. & Mrs. Vijay Kapoor',
      hashtag: invitationData?.hashtag || '#RoshniWedsRahul2026',
      heroImage: invitationData?.photos?.couple || '/images/hero-couple.jpg',
      brideImage: invitationData?.photos?.bride || '/images/gallery-photo-1.jpg',
      groomImage: invitationData?.photos?.groom || '/images/gallery-photo-2.jpg',
      musicUrl: invitationData?.musicUrl || '/wedding-music.mp3',
      rsvpPhone: invitationData?.rsvpPhone || '+91 98888 77777',
      customEnglish: invitationData?.messages?.customEnglish || 'With the love and blessings of our families, we joyfully invite you to celebrate our wedding.',
      customTamil: invitationData?.messages?.customTamil || 'பெரியோர்களின் ஆசிகளுடனும் அன்போடும் எங்கள் இல்லத் திருமண விழாவிற்கு வருகை தந்து மணமக்களை வாழ்த்த அன்புடன் அழைக்கிறோம்.',
    }
  }, [invitationData])

  const events = useMemo(() => {
    if (Array.isArray(invitationData?.events) && invitationData.events.length > 0) {
      return invitationData.events
    }
    return [
      {
        id: 'wedding',
        title: 'Wedding Ceremony / Muhurtham',
        titleTamil: 'சுபமுகூர்த்தம்',
        date: '2026-12-05',
        time: '09:30 AM',
        venueName: 'The Royal Taj Heritage Palace',
        venueNameTamil: 'தி ராயல் தாஜ் ஹெரிடேஜ் பேலஸ்',
        venueAddress: 'Palace Road, Central Heritage District',
        venueAddressTamil: 'பேலஸ் ரோடு, சென்னை',
        mapsUrl: 'https://maps.google.com/?q=Taj+Palace',
        image: '/images/story-1.jpg',
      },
      {
        id: 'reception',
        title: 'Grand Royal Reception',
        titleTamil: 'மங்கல வரவேற்பு',
        date: '2026-12-05',
        time: '07:00 PM',
        venueName: 'Grand Royal Waterfront Lawns',
        venueNameTamil: 'கிராண்ட் ராயல் வாட்டர்பிரண்ட் லான்ஸ்',
        venueAddress: 'Lake View Enclave, Heritage District',
        venueAddressTamil: 'லேக் வியூ என்கிளேவ், சென்னை',
        mapsUrl: 'https://maps.google.com/?q=Grand+Lawn',
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

  // Gentle Floating Rose & Marigold Petals Canvas
  useEffect(() => {
    const canvas = petalCanvasRef.current
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

    const petalColors = ['#f59e0b', '#fbbf24', '#d97706', '#dc2626', '#f43f5e', '#fed7aa']
    const petals = Array.from({ length: 32 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h - h,
      size: Math.random() * 8 + 5,
      vx: Math.random() * 1.2 - 0.6,
      vy: Math.random() * 1.6 + 0.7,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.8,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }))

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      petals.forEach((p) => {
        p.y += p.vy
        p.x += Math.sin(p.y * 0.02) + p.vx
        p.rotation += p.rotSpeed

        if (p.y > h + 20) {
          p.y = -20
          p.x = Math.random() * w
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.65, 0, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.shadowBlur = 4
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

  // Live Countdown Timer
  const [timer, setTimer] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const target = new Date(`${events[0]?.date || '2026-12-05'}T09:30:00`).getTime()
    const id = setInterval(() => {
      const diff = Math.max(0, target - Date.now())
      setTimer({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(id)
  }, [events])

  const handleOpen = () => {
    setOpening(true)
    setTimeout(() => {
      setOpened(true)
      try {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {})
          setMusicOn(true)
        }
      } catch {}
    }, 700)
  }

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.pause()
      setMusicOn(false)
    } else {
      audioRef.current.play().catch(() => {})
      setMusicOn(true)
    }
  }

  const copyToClipboard = (val, key) => {
    navigator.clipboard?.writeText(val)
    setCopiedBank(key)
    setTimeout(() => setCopiedBank(null), 2500)
  }

  const handlePostWish = (e) => {
    e.preventDefault()
    if (!author.trim() || !text.trim()) return
    setWishes([{ name: author.trim(), message: text.trim(), time: 'Just Now' }, ...wishes])
    setAuthor('')
    setText('')
  }

  const handleRsvpSubmit = (e) => {
    e.preventDefault()
    if (!rsvpData.name.trim()) return
    setRsvpDone(true)
  }

  const shareInvitation = () => {
    const message = `✨ Wedding Invitation ✨\nWith great joy, you are invited to celebrate the wedding of ${couple.bride} & ${couple.groom}!\n\n📅 Date: ${events[0]?.date}\n🏛 Venue: ${events[0]?.venueName}\n\nView our wedding invitation card here:\n${window.location.href}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank')
  }

  const milestones = [
    {
      title: lang === 'en' ? 'First Meeting' : 'முதல் சந்திப்பு',
      date: 'Spring 2024',
      desc: lang === 'en' ? 'Introduced through our families, our conversation instantly felt like catching up with a lifelong friend.' : 'இரு குடும்பங்களின் முன்னிலையில் அமைந்த இனிய முதல் அறிமுகம்.',
      icon: '✨',
    },
    {
      title: lang === 'en' ? 'The Engagement' : 'நிச்சயதார்த்தம்',
      date: 'Autumn 2024',
      desc: lang === 'en' ? 'Surrounded by our nearest elders and loved ones, we exchanged rings and promises.' : 'இரு குடும்பப் பெரியோர்களின் ஆசிகளுடன் மங்கலமாக அமைந்த நிச்சயதார்த்தம்.',
      icon: '💍',
    },
    {
      title: lang === 'en' ? 'Mehendi & Sangeet' : 'மெஹந்தி & சங்கீத் வைபவம்',
      date: 'Winter 2025',
      desc: lang === 'en' ? 'A joyous evening of music, laughter, family dance performances, and vibrant colours.' : 'வண்ணமயமான மெஹந்தி மற்றும் குடும்ப உறுப்பினர்களின் இசை நடனக் கொண்டாட்டம்.',
      icon: '🪕',
    },
    {
      title: lang === 'en' ? 'The Wedding Day' : 'சுபமுகூர்த்த நன்னாள்',
      date: events[0]?.date || '2026-12-05',
      desc: lang === 'en' ? 'We begin our new journey together, blessed by all who mean the world to us.' : 'அனைவரின் நல்லாசிகளுடன் தொடங்கவுள்ள எங்களின் இல்லற நல்வாழ்வு.',
      icon: '👑',
    },
  ]

  const faqs = [
    {
      q: lang === 'en' ? 'What are the ceremony timings?' : 'சுபமுகூர்த்த நேரம் என்ன?',
      a: lang === 'en' ? 'The sacred Muhurtham begins at 09:30 AM. Honored guests are requested to arrive by 09:00 AM for welcoming rituals and breakfast.' : 'சுபமுகூர்த்தம் காலை 09:30 மணிக்கு தொடங்கும். காலை 09:00 மணிக்குள் வருகை தருமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.',
    },
    {
      q: lang === 'en' ? 'What is the suggested dress code?' : 'ஆடை அலங்கார வழிகாட்டுதல் என்ன?',
      a: lang === 'en' ? 'Traditional royal attire — Silk Sarees, Dhotis, Sherwanis or Suits in elegant gold, maroon, cream, or jewel tones.' : 'பாரம்பரிய பட்டு உடைகள், வேஷ்டி, ஷெர்வானி அல்லது நேர்த்தியான மங்கல உடைகள்.',
    },
    {
      q: lang === 'en' ? 'Is parking available at the venue?' : 'வாகனம் நிறுத்தும் வசதி உள்ளதா?',
      a: lang === 'en' ? 'Yes, complimentary valet and ample secure parking spaces are arranged at both the palace and lawn venues.' : 'ஆம், இரு நிகழ்விடங்களிலும் இலவச வாகன நிறுத்துமிடம் மற்றும் வழிகாட்டுதல் வசதிகள் உள்ளன.',
    },
  ]

  return (
    <div className="template-06-container min-h-screen bg-[#faf6ee] text-[#2c1d11] font-serif overflow-x-hidden selection:bg-[#801b22] selection:text-[#ffe682] relative">
      <audio ref={audioRef} loop src={couple.musicUrl} />

      {/* Falling Petals Background */}
      <canvas ref={petalCanvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* 1. ANIMATED LOVE HEART / LOTUS INVITATION OPENING EXPERIENCE */}
      {!opened && (
        <div className="relative">
          {/* Top theme switcher toggle: Love vs Lotus */}
          <div className="fixed top-4 right-4 z-[60] flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-400/40 text-[10px] text-rose-200 shadow-lg font-sans">
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

      {/* 2. MAIN SPACIOUS, CLEAN, ULTRA-PREMIUM CONTENT */}
      {opened && (
        <div className="relative z-20 min-h-screen pb-28">
          {/* TOP STICKY NAVBAR */}
          <nav className="sticky top-0 z-40 bg-[#fffcf5]/95 backdrop-blur-md border-b border-[#e2d5c2] px-4 sm:px-6 py-3.5 flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#7a1c1d] text-[#ffe682] flex items-center justify-center text-xs font-bold border border-[#d4af37]">
                R
              </span>
              <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-[#7a1c1d]">
                {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
              </span>
            </div>

            <div className="flex items-center gap-2.5 font-sans text-xs">
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                className="px-3 py-1.5 rounded-xl bg-[#f5ebd9] hover:bg-[#ebdcc4] border border-[#d4af37]/50 font-bold text-[#7a1c1d] transition cursor-pointer"
              >
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>

              {/* WhatsApp Share */}
              <button
                onClick={shareInvitation}
                className="h-8 px-3 rounded-xl bg-emerald-600/15 border border-emerald-600/40 text-emerald-800 font-semibold flex items-center gap-1.5 hover:bg-emerald-600/25 transition cursor-pointer"
                title="Share Invitation"
              >
                <span>💬</span>
                <span className="hidden sm:inline">Share</span>
              </button>

              {/* Music Audio Button */}
              <button
                onClick={toggleAudio}
                className="w-8 h-8 rounded-xl bg-[#7a1c1d] border border-[#d4af37] text-[#ffe682] flex items-center justify-center hover:bg-[#5a1115] transition cursor-pointer shadow-xs"
                title={musicOn ? 'Pause Music' : 'Play Music'}
              >
                {musicOn ? '❚❚' : '🎵'}
              </button>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20 sm:space-y-24">
            {/* HERO SECTION */}
            <section id="home" className="text-center space-y-6 pt-4">
              <div className="space-y-2">
                <span className="inline-block text-[11px] font-sans uppercase tracking-[0.3em] font-bold text-[#8c6d34] bg-[#f5ebd9] px-4 py-1.5 rounded-full border border-[#d4af37]/40 shadow-xs">
                  {lang === 'en' ? 'The Wedding Celebration' : 'மங்கலத் திருமண அழைப்பிதழ்'}
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold text-[#7a1c1d] tracking-wide pt-2">
                  {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
                </h1>
                <p className="text-xs font-sans tracking-widest text-[#8c6d34] font-semibold uppercase">
                  {couple.hashtag}
                </p>
              </div>

              {/* Grand Arch Frame */}
              <div className="relative mx-auto mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d4af37] aspect-[4/5] max-w-md group">
                <img
                  src={couple.heroImage}
                  alt="Couple"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21090c]/90 via-[#21090c]/25 to-transparent flex items-end p-6 sm:p-8">
                  <p className="text-[#ffe682] text-xs sm:text-sm italic text-center w-full leading-relaxed font-sans">
                    "{lang === 'en' ? couple.customEnglish : couple.customTamil}"
                  </p>
                </div>
              </div>

              {/* Prominent Date & Location Banner */}
              <div className="py-4 px-6 rounded-2xl bg-[#fffcf5] border-2 border-[#d4af37] text-[#7a1c1d] font-sans font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto shadow-md">
                <span>📅 {events[0]?.date}</span>
                <span className="hidden sm:inline text-[#d4af37]">•</span>
                <span>🏛 {lang === 'en' ? events[0]?.venueName : events[0]?.venueNameTamil || events[0]?.venueName}</span>
              </div>
            </section>

            {/* LIVE COUNTDOWN TIMER */}
            <section className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] shadow-lg text-center space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold text-[#8c6d34] uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'The Auspicious Countdown' : 'காலக் கணிப்பு'} ✦
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Time Until The Sacred Muhurtham' : 'சுபமுகூர்த்த நன்னாளுக்கான நேரம்'}
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto font-sans">
                <div className="bg-[#faf6ee] p-4 sm:p-5 rounded-2xl border border-[#e2d5c2] shadow-xs">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7a1c1d] block">{timer.d}</span>
                  <span className="text-[11px] text-[#8c6d34] uppercase font-bold tracking-wider">{lang === 'en' ? 'Days' : 'நாட்கள்'}</span>
                </div>
                <div className="bg-[#faf6ee] p-4 sm:p-5 rounded-2xl border border-[#e2d5c2] shadow-xs">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7a1c1d] block">{timer.h}</span>
                  <span className="text-[11px] text-[#8c6d34] uppercase font-bold tracking-wider">{lang === 'en' ? 'Hours' : 'மணி'}</span>
                </div>
                <div className="bg-[#faf6ee] p-4 sm:p-5 rounded-2xl border border-[#e2d5c2] shadow-xs">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7a1c1d] block">{timer.m}</span>
                  <span className="text-[11px] text-[#8c6d34] uppercase font-bold tracking-wider">{lang === 'en' ? 'Mins' : 'நிமிடம்'}</span>
                </div>
                <div className="bg-[#faf6ee] p-4 sm:p-5 rounded-2xl border border-[#e2d5c2] shadow-xs">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#ba9269] block">{timer.s}</span>
                  <span className="text-[11px] text-[#8c6d34] uppercase font-bold tracking-wider">{lang === 'en' ? 'Secs' : 'நொடி'}</span>
                </div>
              </div>
            </section>

            {/* LOVE STORY / SACRED MILESTONES */}
            <section id="story" className="space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#8c6d34] uppercase block">
                  ✦ {lang === 'en' ? 'Our Shared Journey' : 'எங்கள் காதல் பயணம்'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'How Our Story Unfolded' : 'நினைவுத் துளிகள்'}
                </h3>
              </div>

              <div className="relative border-l-2 border-[#d4af37] ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 rounded-full bg-[#7a1c1d] text-[#ffe682] flex items-center justify-center text-sm shadow-md border-2 border-[#d4af37]">
                      {m.icon}
                    </span>
                    <div className="bg-[#fffcf5] p-6 rounded-2xl border border-[#e2d5c2] shadow-sm group-hover:border-[#d4af37] transition space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-lg text-[#7a1c1d]">{m.title}</h4>
                        <span className="text-xs font-sans font-semibold text-[#8c6d34] bg-[#f5ebd9] px-3 py-0.5 rounded-full border border-[#dfd2be] w-fit">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-[#5c4a3e] leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* COUPLE SPOTLIGHT & PARENTS BLESSINGS */}
            <section className="space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#8c6d34] uppercase block">
                  ✦ {lang === 'en' ? 'The Bride & The Groom' : 'மணமக்கள்'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'With the Blessings of Our Families' : 'குடும்பப் பெரியோர்களின் நல்வாழ்த்துகள்'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#fffcf5] p-8 rounded-3xl border border-[#e2d5c2] shadow-sm text-center space-y-4 hover:border-[#d4af37] transition">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-3 border-[#d4af37] shadow-lg">
                    <img src={couple.brideImage} alt={couple.bride} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans uppercase font-bold text-[#8c6d34] tracking-wider block">
                      {lang === 'en' ? 'The Bride' : 'மணமகள்'}
                    </span>
                    <h4 className="text-2xl font-bold text-[#7a1c1d]">
                      {lang === 'en' ? couple.bride : couple.brideTamil}
                    </h4>
                  </div>
                  <p className="text-xs font-sans text-[#5c4a3e] font-semibold border-t border-[#f0e6d6] pt-3">
                    {couple.parentsBride}
                  </p>
                  <p className="text-xs font-sans text-[#8c6d34] italic">
                    "{lang === 'en' ? 'Wishing both a lifetime of unending happiness and warmth.' : 'மங்கல நாயகியாக இல்லறம் சிறக்க நல்லாசிகள்.'}"
                  </p>
                </div>

                <div className="bg-[#fffcf5] p-8 rounded-3xl border border-[#e2d5c2] shadow-sm text-center space-y-4 hover:border-[#d4af37] transition">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-3 border-[#d4af37] shadow-lg">
                    <img src={couple.groomImage} alt={couple.groom} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans uppercase font-bold text-[#8c6d34] tracking-wider block">
                      {lang === 'en' ? 'The Groom' : 'மணமகன்'}
                    </span>
                    <h4 className="text-2xl font-bold text-[#7a1c1d]">
                      {lang === 'en' ? couple.groom : couple.groomTamil}
                    </h4>
                  </div>
                  <p className="text-xs font-sans text-[#5c4a3e] font-semibold border-t border-[#f0e6d6] pt-3">
                    {couple.parentsGroom}
                  </p>
                  <p className="text-xs font-sans text-[#8c6d34] italic">
                    "{lang === 'en' ? 'May your shared road be guided by mutual respect and love.' : 'அறவழியில் இல்லறத்தை சிறக்கச் செய்ய நல்லாசிகள்.'}"
                  </p>
                </div>
              </div>
            </section>

            {/* ATTIRE GUIDE & COLOR PALETTE */}
            <section id="attire" className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] space-y-6 shadow-md">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans text-[#8c6d34] font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'Wedding Attire & Theme Guide' : 'ஆடை வழிகாட்டுதல்'} ✦
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Colors of Celebration' : 'மங்கல ஆடை பரிந்துரைகள்'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <div className="bg-[#faf6ee] p-5 rounded-2xl border border-[#e2d5c2] space-y-2 text-center">
                  <span className="inline-block bg-[#7a1c1d]/10 text-[#7a1c1d] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Muhurtham Morning' : 'சுபமுகூர்த்த காலை'}
                  </span>
                  <p className="text-[#5c4a3e] leading-relaxed">
                    {lang === 'en'
                      ? 'Traditional Silk Sarees, Pattu Veshtis, or formal Kurtas with delicate gold zari accents.'
                      : 'பாரம்பரிய பட்டுச் சேலை, பட்டு வேஷ்டி மற்றும் மங்கல உடைகள்.'}
                  </p>
                </div>
                <div className="bg-[#faf6ee] p-5 rounded-2xl border border-[#e2d5c2] space-y-2 text-center">
                  <span className="inline-block bg-[#8c6d34]/15 text-[#8c6d34] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Grand Royal Reception' : 'மங்கல வரவேற்பு இரவு'}
                  </span>
                  <p className="text-[#5c4a3e] leading-relaxed">
                    {lang === 'en'
                      ? 'Sherwanis, Tuxedos, Evening Lehengas and Gowns in royal crimson, gold, or wine shades.'
                      : 'ராயல் ஷெர்வானி, லெஹங்கா, கோட் மற்றும் நேர்த்தியான மாலை நேர உடைகள்.'}
                  </p>
                </div>
              </div>

              {/* Swatches */}
              <div className="pt-2 text-center space-y-2 font-sans">
                <p className="text-xs text-[#8c6d34] font-medium">
                  {lang === 'en' ? 'Curated Festive Palette:' : 'பரிந்துரைக்கப்படும் வண்ணங்கள்:'}
                </p>
                <div className="flex justify-center items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#7a1c1d] border-2 border-[#d4af37] shadow-sm" title="Royal Crimson" />
                  <div className="w-7 h-7 rounded-full bg-[#d4af37] border-2 border-[#8c6d34] shadow-sm" title="Antique Gold" />
                  <div className="w-7 h-7 rounded-full bg-[#faf6ee] border-2 border-[#d4af37] shadow-sm" title="Raw Silk Ivory" />
                  <div className="w-7 h-7 rounded-full bg-[#1b4332] border-2 border-[#d4af37] shadow-sm" title="Emerald Green" />
                  <div className="w-7 h-7 rounded-full bg-[#f59e0b] border-2 border-[#d4af37] shadow-sm" title="Festive Amber" />
                </div>
              </div>
            </section>

            {/* CEREMONIES & SCHEDULE WITH CRYSTAL CLEAR CALENDAR BUTTONS */}
            <section id="events" className="space-y-8">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#8c6d34] uppercase block">
                  ✦ {lang === 'en' ? 'Ceremonies & Timings' : 'நிகழ்ச்சி நிரல்'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Wedding Schedule' : 'மங்கல நிகழ்வுகள் மற்றும் வரவேற்பு'}
                </h3>
              </div>

              <div className="space-y-6">
                {events.map((ev, idx) => {
                  const googleCalUrl = buildGoogleCalendarUrl(ev, `${couple.bride} & ${couple.groom}`)
                  return (
                    <div
                      key={ev.id || idx}
                      className="bg-[#fffcf5] p-7 sm:p-8 rounded-3xl border border-[#e2d5c2] shadow-sm hover:border-[#d4af37] transition space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-[#f0e6d6] pb-4">
                        <div>
                          <span className="inline-block bg-[#f5ebd9] text-[#7a1c1d] font-sans font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-1.5 border border-[#dfd2be]">
                            {idx === 0 ? (lang === 'en' ? 'Sacred Muhurtham' : 'சுபமுகூர்த்தம்') : (lang === 'en' ? 'Grand Reception' : 'வரவேற்பு')}
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-bold text-[#7a1c1d]">
                            {lang === 'en' ? ev.title : ev.titleTamil || ev.title}
                          </h4>
                        </div>
                        <span className="text-xs font-sans font-bold bg-[#7a1c1d] text-[#ffe682] px-4 py-2 rounded-full w-fit shadow-xs">
                          ⏰ {ev.time}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs sm:text-sm font-sans text-[#5c4a3e]">
                        <p className="font-bold text-[#2c1d11]">📅 {ev.date}</p>
                        <p className="font-bold text-[#7a1c1d]">🏛 {lang === 'en' ? ev.venueName : ev.venueNameTamil || ev.venueName}</p>
                        <p className="text-[#7a6452]">📍 {lang === 'en' ? ev.venueAddress : ev.venueAddressTamil || ev.venueAddress}</p>
                      </div>

                      {/* Prominent, Crystal Clear Action Buttons */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                        <a
                          href={googleCalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="py-3 px-4 rounded-xl bg-[#7a1c1d] hover:bg-[#5a1115] text-[#ffe682] text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <span>📅</span>
                          <span>{lang === 'en' ? 'Add to Google Calendar' : 'கூகுள் கேலெண்டரில் சேர்'}</span>
                        </a>

                        <button
                          onClick={() => downloadICS(ev, `${couple.bride} & ${couple.groom}`)}
                          className="py-3 px-4 rounded-xl bg-[#f5ebd9] hover:bg-[#ebdcc4] border border-[#d4af37]/60 text-[#7a1c1d] text-xs font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
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

            {/* TABBED VENUE SELECTOR WITH INTERACTIVE GOOGLE MAPS IFRAME */}
            <section id="venue" className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] space-y-6 shadow-md">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#8c6d34] uppercase block">
                  ✦ {lang === 'en' ? 'Interactive Directions' : 'மண்டப வழிகாட்டி'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Venue Location & Map' : 'நிகழ்விட வரைபடம்'}
                </h3>
              </div>

              {/* Venue Tabs */}
              <div className="flex p-1.5 bg-[#faf6ee] rounded-2xl border border-[#e2d5c2] font-sans">
                {events.map((ev, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVenueTab(i)}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                      activeVenueTab === i
                        ? 'bg-[#7a1c1d] text-[#ffe682] shadow-md'
                        : 'text-[#8c6d34] hover:text-[#7a1c1d]'
                    }`}
                  >
                    {lang === 'en' ? ev.title : ev.titleTamil || ev.title}
                  </button>
                ))}
              </div>

              {/* Active Venue Details */}
              {events[activeVenueTab] && (
                <div className="space-y-4">
                  <div className="bg-[#faf6ee] p-5 rounded-2xl border border-[#e2d5c2] space-y-1.5 font-sans">
                    <h4 className="font-serif font-bold text-xl text-[#7a1c1d]">
                      {lang === 'en'
                        ? events[activeVenueTab].venueName
                        : events[activeVenueTab].venueNameTamil || events[activeVenueTab].venueName}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5c4a3e]">
                      📍 {lang === 'en'
                        ? events[activeVenueTab].venueAddress
                        : events[activeVenueTab].venueAddressTamil || events[activeVenueTab].venueAddress}
                    </p>
                    <p className="text-xs text-[#8c6d34] font-bold">⏰ {events[activeVenueTab].time}</p>
                  </div>

                  {/* Embedded Google Maps Iframe */}
                  <div className="rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-md h-72 sm:h-80 w-full bg-[#f5ebd9]">
                    <iframe
                      title="Mandapam Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        events[activeVenueTab].venueName + ' ' + events[activeVenueTab].venueAddress
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>

                  {/* High Visibility Directions Button */}
                  <a
                    href={events[activeVenueTab].mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(events[activeVenueTab].venueName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-4 rounded-2xl bg-gradient-to-r from-[#941c23] via-[#7a1c1d] to-[#5a1115] text-[#ffe682] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-center shadow-lg hover:scale-[1.01] transition"
                  >
                    📍 {lang === 'en' ? 'Get Directions on Google Maps ↗' : 'கூகுள் மேப்பில் வழிகாட்டுதல் பெறுக ↗'}
                  </a>
                </div>
              )}
            </section>

            {/* CREATIVE EDITORIAL MASONRY GALLERY */}
            <section id="gallery" className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#8c6d34] uppercase block">
                  ✦ {lang === 'en' ? 'Captured Memories' : 'புகைப்படத் தொகுப்பு'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'The Couple Photo Gallery' : 'காதல் தருணங்கள்'}
                </h3>
                <p className="text-xs font-sans text-[#8c6d34]">
                  {lang === 'en' ? 'Click any photo to explore in high resolution' : 'பெரிதாக்கிப் பார்க்க புகைப்படத்தைத் தொடவும்'}
                </p>
              </div>

              {/* Asymmetric Editorial Masonry Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Featured Large Hero Photo */}
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="sm:col-span-7 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#d4af37] bg-[#f5ebd9] group cursor-pointer relative shadow-md"
                >
                  <img
                    src={galleryImages[0]}
                    alt="Featured Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-white text-xs font-sans font-bold bg-[#7a1c1d] px-3 py-1 rounded-full border border-[#d4af37]">
                      🔍 Photo 01 / 0{galleryImages.length}
                    </span>
                  </div>
                </div>

                {/* Stacked Right Column */}
                <div className="sm:col-span-5 grid grid-cols-2 sm:grid-cols-1 gap-4">
                  {galleryImages.slice(1, 3).map((src, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setLightboxIndex(i + 1)}
                      className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d4af37] bg-[#f5ebd9] group cursor-pointer relative shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Moment ${i + 2}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-sans font-bold bg-[#7a1c1d] px-2.5 py-1 rounded-full border border-[#d4af37]">
                          🔍 0{i + 2}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom 3 Grid Row */}
                {galleryImages.slice(3).map((src, i) => (
                  <div
                    key={i + 3}
                    onClick={() => setLightboxIndex(i + 3)}
                    className="sm:col-span-4 aspect-square rounded-2xl overflow-hidden border-2 border-[#d4af37] bg-[#f5ebd9] group cursor-pointer relative shadow-sm"
                  >
                    <img
                      src={src}
                      alt={`Moment ${i + 4}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-sans font-bold bg-[#7a1c1d] px-2.5 py-1 rounded-full border border-[#d4af37]">
                        🔍 0{i + 4}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DIGITAL SHAGUN / UPI & BLESSINGS */}
            <section className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] space-y-6 text-center shadow-md">
              <div className="space-y-1">
                <span className="text-xs font-sans text-[#8c6d34] font-semibold uppercase tracking-wider block">
                  ✦ {lang === 'en' ? 'Digital Shagun / Gift Registry' : 'மங்கல அன்பளிப்பு'} ✦
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Send Your Blessings & Love' : 'நல்வாழ்த்துகள் & அன்பளிப்பு'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-sans text-[#5c4a3e] max-w-lg mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Your heartfelt prayers and presence are the greatest gift of all. For loved ones wishing to offer Shagun digitally:'
                  : 'தங்களின் வருகையும் நல்லாசிகளுமே எங்களின் மிகப்பெரிய பாக்கியம்! அன்பளிப்பினை டிஜிட்டல் முறையில் வழங்க விரும்பினால்:'}
              </p>

              <div className="bg-[#faf6ee] p-6 rounded-2xl border border-[#e2d5c2] max-w-lg mx-auto space-y-4 font-sans">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-[#fffcf5] p-4 rounded-xl border border-[#d4af37]/50 shadow-xs">
                  <div className="text-left">
                    <span className="text-[10px] text-[#8c6d34] uppercase font-bold block">UPI ID</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#7a1c1d]">wed.roshni.rahul@upi</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('wed.roshni.rahul@upi', 'upi')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#7a1c1d] hover:bg-[#5a1115] text-[#ffe682] text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    {copiedBank === 'upi' ? (lang === 'en' ? '✓ Copied!' : '✓ நகலெடுக்கப்பட்டது!') : (lang === 'en' ? '📋 Copy UPI' : '📋 நகலெடு')}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-[#fffcf5] p-4 rounded-xl border border-[#d4af37]/50 shadow-xs">
                  <div className="text-left">
                    <span className="text-[10px] text-[#8c6d34] uppercase font-bold block">Bank Account & IFSC</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#2c1d11]">A/C: 887766554433 • SBIN0004321</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('887766554433 IFSC: SBIN0004321', 'acc')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#7a1c1d] hover:bg-[#5a1115] text-[#ffe682] text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    {copiedBank === 'acc' ? (lang === 'en' ? '✓ Copied!' : '✓ நகலெடுக்கப்பட்டது!') : (lang === 'en' ? '📋 Copy Details' : '📋 நகலெடு')}
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE RSVP FORM */}
            <section id="rsvp" className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border-2 border-[#d4af37] space-y-6 shadow-md">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans uppercase font-bold tracking-[0.25em] text-[#8c6d34] block">
                  ✦ RSVP ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Kindly Confirm Your Presence' : 'வருகையை உறுதிசெய்யவும்'}
                </h3>
                <p className="text-xs font-sans text-[#8c6d34]">
                  {lang === 'en' ? 'Please grace us with your RSVP confirmation by Nov 25, 2026' : 'நிகழ்வில் தாங்கள் கலந்துகொள்வதை உறுதிசெய்யவும்'}
                </p>
              </div>

              {rsvpDone ? (
                <div className="bg-[#faf6ee] border-2 border-[#d4af37] p-8 rounded-2xl text-center space-y-3">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-lg font-bold text-[#7a1c1d]">
                    {lang === 'en' ? 'Heartfelt Thanks for Confirming!' : 'நன்றி! தங்கள் வருகை உறுதி செய்யப்பட்டது'}
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-[#5c4a3e]">
                    {lang === 'en'
                      ? 'We eagerly anticipate welcoming you and your family to celebrate our special day.'
                      : 'மண்டபத்தில் தங்களை மகிழ்ச்சியுடன் வரவேற்க ஆவலுடன் காத்திருக்கிறோம்.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4 font-sans text-xs max-w-xl mx-auto">
                  <div>
                    <label className="block text-[#2c1d11] font-bold mb-1.5">{lang === 'en' ? 'Your Honored Name' : 'உங்கள் பெயர்'}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramalingam & Family"
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      className="w-full bg-[#faf6ee] p-3.5 rounded-xl border border-[#e2d5c2] focus:outline-none focus:border-[#7a1c1d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2c1d11] font-bold mb-1.5">{lang === 'en' ? 'Attendance Status' : 'வருகை நிலை'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: 'yes' })}
                        className={`py-3 rounded-xl font-bold border transition cursor-pointer ${
                          rsvpData.attendance === 'yes'
                            ? 'bg-[#7a1c1d] border-[#d4af37] text-[#ffe682] shadow-sm'
                            : 'bg-[#faf6ee] border-[#e2d5c2] text-[#8c6d34]'
                        }`}
                      >
                        ✓ {lang === 'en' ? 'Joyfully Attending' : 'மகிழ்ச்சியுடன் வருகிறோம்'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, attendance: 'no' })}
                        className={`py-3 rounded-xl font-bold border transition cursor-pointer ${
                          rsvpData.attendance === 'no'
                            ? 'bg-[#8c6d34] border-[#8c6d34] text-white shadow-sm'
                            : 'bg-[#faf6ee] border-[#e2d5c2] text-[#8c6d34]'
                        }`}
                      >
                        ✕ {lang === 'en' ? 'Regretfully Cannot' : 'வர இயலவில்லை'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#2c1d11] font-bold mb-1.5">{lang === 'en' ? 'Number of Honored Guests' : 'விருந்தினர் எண்ணிக்கை'}</label>
                    <select
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                      className="w-full bg-[#faf6ee] p-3.5 rounded-xl border border-[#e2d5c2] focus:outline-none focus:border-[#7a1c1d]"
                    >
                      <option value="1">1 {lang === 'en' ? 'Guest' : 'நபர்'}</option>
                      <option value="2">2 {lang === 'en' ? 'Guests' : 'நபர்கள்'}</option>
                      <option value="3">3 {lang === 'en' ? 'Guests' : 'நபர்கள்'}</option>
                      <option value="4+">4+ {lang === 'en' ? 'Guests (With Family)' : 'நபர்கள் (குடும்பத்துடன்)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#2c1d11] font-bold mb-1.5">{lang === 'en' ? 'Congratulatory Note / Diet' : 'வாழ்த்துச் செய்தி / குறிப்பு'}</label>
                    <textarea
                      rows={2}
                      placeholder={lang === 'en' ? 'Looking forward to the celebration...' : 'உங்கள் நல்வாழ்த்து...'}
                      value={rsvpData.notes}
                      onChange={(e) => setRsvpData({ ...rsvpData, notes: e.target.value })}
                      className="w-full bg-[#faf6ee] p-3.5 rounded-xl border border-[#e2d5c2] focus:outline-none focus:border-[#7a1c1d]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#941c23] via-[#7a1c1d] to-[#5a1115] text-[#ffe682] font-bold uppercase tracking-wider shadow-lg cursor-pointer hover:scale-[1.01] transition"
                  >
                    {lang === 'en' ? 'Submit RSVP Confirmation' : 'வருகையை உறுதிசெய்'}
                  </button>

                  {/* Direct WhatsApp RSVP */}
                  {couple.rsvpPhone && (
                    <a
                      href={buildWhatsAppUrl(
                        couple.rsvpPhone,
                        `Hello! I am pleased to confirm my attendance for the wedding celebration of ${couple.bride} & ${couple.groom}. Looking forward to celebrating with you!`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center py-2 text-emerald-800 font-bold hover:underline"
                    >
                      💬 {lang === 'en' ? 'Or RSVP directly via WhatsApp' : 'வாட்ஸ்அப் மூலம் உடனடியாக உறுதிசெய்ய'}
                    </a>
                  )}
                </form>
              )}
            </section>

            {/* LIVE WISHES WALL */}
            <section id="wishes" className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border border-[#e2d5c2] space-y-6 shadow-sm">
              <div className="text-center space-y-1">
                <span className="text-xs font-sans uppercase font-bold tracking-[0.25em] text-[#8c6d34] block">
                  ✦ {lang === 'en' ? 'Warm Blessings' : 'வாழ்த்துச் சுவர்'} ✦
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#7a1c1d]">
                  {lang === 'en' ? 'Blessings & Wishes Wall' : 'மணமக்களுக்கான நல்வாழ்த்துகள்'}
                </h3>
              </div>

              <form onSubmit={handlePostWish} className="space-y-3 font-sans max-w-xl mx-auto">
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'Your Name' : 'உங்கள் பெயர்'}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#e2d5c2] text-xs bg-[#faf6ee] focus:outline-none focus:border-[#7a1c1d]"
                />
                <textarea
                  rows={2}
                  required
                  placeholder={lang === 'en' ? 'Write your warm blessings for the couple...' : 'மணமக்களுக்கான நல்வாழ்த்து...'}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#e2d5c2] text-xs bg-[#faf6ee] focus:outline-none focus:border-[#7a1c1d]"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#7a1c1d] text-[#ffe682] text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer hover:bg-[#5a1115] transition"
                >
                  {lang === 'en' ? 'Post Blessing' : 'வாழ்த்தைப் பதிவிடவும்'}
                </button>
              </form>

              <div className="space-y-3 pt-2 max-h-72 overflow-y-auto font-sans max-w-xl mx-auto">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#faf6ee] border border-[#e2d5c2] text-xs space-y-1 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#7a1c1d]">{w.name}</span>
                      <span className="text-[10px] text-[#8c6d34]">{w.time}</span>
                    </div>
                    <p className="text-[#5c4a3e]">{w.message}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQS ACCORDION */}
            <section className="bg-[#fffcf5] p-8 sm:p-10 rounded-3xl border border-[#e2d5c2] space-y-4 shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-[#7a1c1d]">
                {lang === 'en' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
              </h3>
              <div className="divide-y divide-[#f0e6d6] font-sans max-w-xl mx-auto">
                {faqs.map((f, i) => (
                  <div key={i} className="py-3.5">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center text-left text-xs sm:text-sm font-bold text-[#2c1d11] cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <span className="text-[#7a1c1d] text-base">{openFaq === i ? '▲' : '▼'}</span>
                    </button>
                    {openFaq === i && (
                      <p className="mt-2 text-xs sm:text-sm text-[#5c4a3e] leading-relaxed pl-3 border-l-2 border-[#7a1c1d]">
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center pt-8 border-t border-[#e2d5c2] text-xs font-sans text-[#8c6d34] space-y-2">
              <p className="font-serif font-bold text-xl text-[#7a1c1d]">
                {lang === 'en' ? `${couple.bride} & ${couple.groom}` : `${couple.brideTamil} & ${couple.groomTamil}`}
              </p>
              <p>{lang === 'en' ? 'With love and heartfelt thanks for celebrating with us.' : 'வருகை தந்து வாழ்த்தும் அனைத்து நல்நெஞ்சங்களுக்கும் மனமார்ந்த நன்றிகள்.'}</p>
              <p className="text-[11px] text-[#8c6d34] font-semibold">{couple.hashtag}</p>
            </footer>
          </div>

          {/* STICKY BOTTOM MOBILE NAVIGATION BAR */}
          <div className="fixed bottom-3 inset-x-4 max-w-lg mx-auto z-40 bg-[#fffcf5]/95 backdrop-blur-xl border border-[#d4af37] rounded-2xl py-2.5 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex justify-around items-center text-[10px] font-sans">
            <a href="#home" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">🏠</span>
              <span>{lang === 'en' ? 'Home' : 'முகப்பு'}</span>
            </a>
            <a href="#story" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">📖</span>
              <span>{lang === 'en' ? 'Story' : 'பயணம்'}</span>
            </a>
            <a href="#events" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">📅</span>
              <span>{lang === 'en' ? 'Schedule' : 'நிகழ்வுகள்'}</span>
            </a>
            <a href="#venue" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">📍</span>
              <span>{lang === 'en' ? 'Venue' : 'வரைபடம்'}</span>
            </a>
            <a href="#gallery" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">📷</span>
              <span>{lang === 'en' ? 'Photos' : 'படங்கள்'}</span>
            </a>
            <a href="#rsvp" className="flex flex-col items-center text-[#8c6d34] hover:text-[#7a1c1d]">
              <span className="text-sm">✉</span>
              <span>RSVP</span>
            </a>
            <a href="#wishes" className="flex flex-col items-center text-[#7a1c1d] hover:text-[#5a1115]">
              <span className="text-sm">♥</span>
              <span>{lang === 'en' ? 'Wishes' : 'வாழ்த்து'}</span>
            </a>
          </div>

          {/* HIGH-RES LIGHTBOX MODAL WITH PREV / NEXT / CLOSE */}
          {lightboxIndex !== null && (
            <div
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-[#d4af37] shadow-2xl bg-black"
              >
                <img
                  src={galleryImages[lightboxIndex]}
                  alt="Enlarged moment"
                  className="w-full h-full max-h-[75vh] object-contain mx-auto"
                />

                {/* Top Bar with Counter & Close */}
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

                {/* Prev / Next Navigation Controls */}
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
