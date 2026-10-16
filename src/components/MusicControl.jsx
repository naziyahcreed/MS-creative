import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const MusicControl = forwardRef(function MusicControl({ on }, ref) {
  const audioRef = useRef(null)

  useImperativeHandle(ref, () => ({
    start: () => {
      audioRef.current?.play().catch(() => {})
    },
  }))

  useEffect(() => {
    if (on) audioRef.current?.play().catch(() => {})
    else audioRef.current?.pause()
  }, [on])

  return <audio ref={audioRef} loop src="/music.mp3" preload="none" />
})

export default MusicControl
