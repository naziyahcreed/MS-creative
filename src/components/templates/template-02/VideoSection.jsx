import { useState } from 'react'
import weddingData from './data/weddingData'

export default function VideoSection() {
  const { video } = weddingData
  const [playing, setPlaying] = useState(false)

  if (!video?.enabled) return null

  return (
    <section className="px-5 py-16 md:px-12" aria-labelledby="video-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="video-heading" className="font-serif-display text-3xl text-maroon-deep">
          {video.title}
        </h2>
        <div className="relative mt-8 aspect-video overflow-hidden gold-border-thin bg-maroon-deep/10">
          {!playing ? (
            <>
              <img src={video.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-maroon-deep/30 font-serif-display text-xl text-ivory transition hover:bg-maroon-deep/40"
                data-cursor="button"
              >
                ▶ Play
              </button>
            </>
          ) : video.youtubeId ? (
            <iframe
              title={video.title}
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : video.mp4Src ? (
            <video controls className="h-full w-full" poster={video.poster} preload="none">
              <source src={video.mp4Src} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
    </section>
  )
}
