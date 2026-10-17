import weddingData from './data/weddingData'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function DesktopNav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 hidden border-b border-gold-line/20 bg-ivory/90 backdrop-blur-sm md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <span className="font-serif-display text-lg text-maroon-deep">{weddingData.couple.initials}</span>
        <nav aria-label="Primary desktop">
          <ul className="flex gap-8">
            {links.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="text-sm uppercase tracking-widest text-maroon-muted transition hover:text-maroon-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-line"
                  data-cursor="button"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
