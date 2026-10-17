import Reveal from './Reveal'

export default function SectionShell({
  id,
  badge,
  title,
  subtitle,
  glyph = '✦',
  tone = 'light',
  children,
  className = '',
}) {
  const bg = tone === 'cream' ? 'section-tone-cream' : tone === 'white' ? 'section-tone-white' : 'section-tone-light'

  return (
    <section id={id} className={`section-container ${bg} ${className}`}>
      <Reveal className="section-head">
        {badge ? <span className="section-badge font-tamil">{badge}</span> : null}
        <h2 className="section-main-title font-tamil">{title}</h2>
        {subtitle ? <p className="section-subtitle font-tamil">{subtitle}</p> : null}
        <div className="gold-flourish" aria-hidden>
          <span>{glyph}</span>
        </div>
      </Reveal>
      {children}
    </section>
  )
}
