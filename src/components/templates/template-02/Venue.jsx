import weddingData from './data/weddingData'
import { IconLocation, IconTemple } from './icons/LineIcons'

export default function Venue() {
  const { venue } = weddingData

  return (
    <section id="venue" className="px-5 py-16 md:px-12 md:py-20" aria-labelledby="venue-heading">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="venue-heading" className="font-serif-display text-3xl text-maroon-deep md:text-4xl">
            Venue
          </h2>
          <div className="mt-6 flex items-start gap-3 text-maroon-muted">
            <IconTemple className="mt-1 shrink-0 text-gold-antique" />
            <div>
              <p className="font-serif-display text-2xl text-maroon-deep">{venue.name}</p>
              <p className="mt-2">{venue.address}</p>
              <p className="mt-1 text-sm">{venue.city}</p>
            </div>
          </div>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 border border-gold-line/50 px-6 py-2 text-sm text-maroon-deep transition hover:border-gold-line"
            data-cursor="button"
          >
            <IconLocation className="text-gold-antique" />
            Open in Maps
          </a>
        </div>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-border-thin relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-sandalwood/40 to-ivory-dark p-8 text-center transition hover:shadow-lg"
          data-cursor="event"
        >
          <div className="pointer-events-none">
            <IconLocation className="mx-auto h-12 w-12 text-gold-antique/60" />
            <p className="mt-4 font-serif-display text-lg text-maroon-deep">{venue.hall}</p>
            <p className="mt-2 text-sm text-maroon-muted">Tap for directions</p>
          </div>
        </a>
      </div>
    </section>
  )
}
