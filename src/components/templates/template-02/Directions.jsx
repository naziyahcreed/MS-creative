import weddingData from './data/weddingData'

export default function Directions() {
  const { venue, directions, events } = weddingData
  const wedding = events.wedding

  return (
    <section className="border-y border-gold-line/20 bg-ivory-dark/40 px-5 py-16 md:px-12" aria-labelledby="directions-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="directions-heading" className="font-serif-display text-3xl text-maroon-deep">
          {directions.title}
        </h2>
        <dl className="mt-8 space-y-4 text-maroon-muted">
          <div>
            <dt className="text-xs uppercase tracking-wider text-maroon-muted/80">Address</dt>
            <dd className="mt-1 text-lg text-maroon-deep">
              {wedding.venue}, {wedding.address}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-maroon-muted/80">Landmark</dt>
            <dd className="mt-1">{venue.landmark}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-maroon-muted/80">Parking</dt>
            <dd className="mt-1">{venue.parking}</dd>
          </div>
        </dl>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-12 w-full items-center justify-center bg-maroon-deep px-6 py-3 font-serif-display text-lg text-ivory md:inline-flex md:w-auto"
          data-cursor="cta"
        >
          Navigate Now
        </a>
      </div>
    </section>
  )
}
