import weddingData from './data/weddingData'
import SectionShell from './SectionShell'
import { useLanguage } from '../../../context/LanguageContext'

export default function InvitationMessage() {
  const { lang, t } = useLanguage()
  const { invitationMessage, couple } = weddingData
  const msg = lang === 'ta' ? invitationMessage.tamil : invitationMessage.english

  return (
    <SectionShell
      id="message"
      badge={t('அழைப்பு உரை', 'Our Invitation')}
      title={t('மங்கல திருமண அழைப்பு', 'Cordially Inviting You')}
      subtitle={`${t(couple.brideNameTamil, couple.brideName)} & ${t(couple.groomNameTamil, couple.groomName)}`}
      glyph="🪔"
      tone="cream"
    >
      <div className="mx-auto mt-6 max-w-xl text-center">
        {/* Auspicious Tamil Greeting Title */}
        <h3 className="font-tamil text-xl sm:text-2xl font-bold text-[#740a18]">
          {msg.heading}
        </h3>

        {/* Poetic Quote */}
        <p className="mt-3 font-serif text-base sm:text-lg italic text-[#91681e] font-semibold">
          &ldquo;{msg.quote}&rdquo;
        </p>

        {/* Sacred Invitation Body Lines */}
        <div className="mt-6 space-y-3 rounded-2xl border border-[#dfb557]/45 bg-[#ffffff] p-6 shadow-sm">
          {msg.lines.map((line, i) => (
            <p key={i} className="font-tamil text-sm sm:text-base leading-relaxed text-[#402013] font-medium">
              {line}
            </p>
          ))}
          
          <div className="my-4 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-[#dfb557]/50" />
            <span className="text-sm">❦</span>
            <span className="h-px w-12 bg-[#dfb557]/50" />
          </div>

          <p className="font-tamil text-sm sm:text-base font-bold text-[#740a18]">
            {msg.body}
          </p>
        </div>

        {/* Both Languages subtle footer reminder */}
        {lang === 'ta' && (
          <p className="mt-4 font-serif text-xs text-[#755243] italic">
            &ldquo;Two hearts, one journey, as we begin our forever... With your blessings, we look forward to a lifetime together.&rdquo;
          </p>
        )}
      </div>
    </SectionShell>
  )
}
