import { useState } from 'react'
import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function RSVP() {
  const { lang, t } = useLanguage()
  const { rsvp, contacts, couple } = weddingData
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('2')
  const [attendance, setAttendance] = useState('yes')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWhatsAppSend = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert(lang === 'ta' ? 'தயவுசெய்து தங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your name.')
      return
    }

    const attendanceText = attendance === 'yes'
      ? (lang === 'ta' ? 'ஆம், குடும்பத்துடன் நிச்சயமாக வருகை தருவோம் 🌸' : 'Yes, will gladly attend 🌸')
      : (lang === 'ta' ? 'வாழ்த்துகள்! ஆனால் வர இயலாது' : 'Sending warm wishes, unable to attend')

    const greeting = lang === 'ta' ? 'வணக்கம்!' : 'Vanakkam!'
    const text = `${greeting} ${couple.brideName} & ${couple.groomName} திருமண அழைப்பிதழ் கண்டோம்.\n\n` +
      `👤 பெயர்: ${name}\n` +
      `👥 வருகை தரும் நபர்கள்: ${guests}\n` +
      `✨ வருகை: ${attendanceText}\n` +
      (message.trim() ? `💌 வாழ்த்து செய்தி: ${message}\n` : '') +
      `\nமங்கல வாழ்த்துகள்!`

    const url = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  return (
    <SectionShell
      id="rsvp"
      badge={t('வாழ்த்துகள் & பதிவு', 'Send Blessings')}
      title={t(rsvp.titleTamil, rsvp.titleEnglish)}
      subtitle={t(rsvp.subtitleTamil, rsvp.subtitleEnglish)}
      glyph="💌"
      tone="cream"
    >
      <div className="mx-auto mt-6 max-w-lg">
        
        {/* RSVP Card */}
        <div className="rounded-2xl border-2 border-[#dfb557]/60 bg-[#ffffff] p-6 shadow-md">
          {submitted ? (
            <div className="py-6 text-center">
              <span className="text-4xl">🙏</span>
              <h3 className="mt-3 font-tamil text-xl font-bold text-[#740a18]">
                {t(rsvp.successMessageTamil, rsvp.successMessageEnglish)}
              </h3>
              <p className="mt-2 font-tamil text-xs text-[#755243]">
                {t('தங்கள் அன்பான வாழ்த்துகளுக்கு நன்றி!', 'Thank you for your blessings and RSVP!')}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 btn-pill-cal text-xs"
              >
                {t('மீண்டும் பதிவு செய்ய', 'Submit another response')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <div>
                <label className="block font-tamil text-xs font-bold text-[#740a18] mb-1">
                  {t('தங்கள் திருப்பெயர் / குடும்பப் பெயர் *', 'Your Name / Family Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'ta' ? 'எ.கா: சுந்தரம் & குடும்பத்தினர்' : 'e.g. Sundaram & Family'}
                  className="w-full rounded-xl border border-[#dfb557]/70 bg-[#fffdf9] p-3 font-tamil text-sm text-[#2e1710] focus:border-[#740a18] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-tamil text-xs font-bold text-[#740a18] mb-1">
                    {t('நபர்கள் எண்ணிக்கை', 'Number of Guests')}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-xl border border-[#dfb557]/70 bg-[#fffdf9] p-3 font-tamil text-sm text-[#2e1710] focus:border-[#740a18] focus:outline-none"
                  >
                    <option value="1">1 {t('நபர்', 'Guest')}</option>
                    <option value="2">2 {t('நபர்கள்', 'Guests')}</option>
                    <option value="3">3 {t('நபர்கள்', 'Guests')}</option>
                    <option value="4">4 {t('நபர்கள்', 'Guests')}</option>
                    <option value="5+">5+ {t('நபர்கள் (குடும்பத்துடன்)', 'Family')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-tamil text-xs font-bold text-[#740a18] mb-1">
                    {t('வருகை உறுதிப்பாடு', 'Will you attend?')}
                  </label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full rounded-xl border border-[#dfb557]/70 bg-[#fffdf9] p-3 font-tamil text-sm text-[#2e1710] focus:border-[#740a18] focus:outline-none"
                  >
                    <option value="yes">✅ {t('நிச்சயம் வருகிறோம்', 'Attending with Joy')}</option>
                    <option value="no">🌸 {t('வாழ்த்துகள், வர இயலவில்லை', 'Sending Blessings')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-tamil text-xs font-bold text-[#740a18] mb-1">
                  {t('மணமக்களுக்கு மங்கல வாழ்த்து செய்தி', 'Wishes & Blessings for Couple')}
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'ta' ? 'மணமக்கள் பல்லாண்டு காலம் வாழ்க வளமுடன் என மனமார வாழ்த்துகிறோம்...' : 'May your married life be filled with love, laughter, and joy...'}
                  className="w-full rounded-xl border border-[#dfb557]/70 bg-[#fffdf9] p-3 font-tamil text-sm text-[#2e1710] focus:border-[#740a18] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#25d366] to-[#128c7e] py-3.5 px-4 font-tamil text-sm font-bold text-white shadow-md transition hover:opacity-95 active:scale-98 flex items-center justify-center gap-2"
              >
                <span className="text-lg">💬</span>
                <span>{t('வாட்ஸ்அப் வழியாக வாழ்த்து அனுப்பவும்', 'Send Blessings via WhatsApp')}</span>
              </button>
            </form>
          )}

          {/* Quick Call Family Contacts */}
          <div className="mt-6 border-t border-[#dfb557]/40 pt-5">
            <p className="text-center font-tamil text-xs font-bold text-[#740a18] mb-3">
              📞 {t('தொடர்புக்கு / நேரடி அழைப்பிற்கு', 'Family Contact Numbers')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#dfb557] bg-[#faf4e6] px-3.5 py-1.5 font-tamil text-xs font-bold text-[#740a18] hover:bg-[#dfb557]/30 transition"
                >
                  <span>📞</span>
                  <span>{t(c.labelTamil, c.labelEnglish)}: {c.phone}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </SectionShell>
  )
}
