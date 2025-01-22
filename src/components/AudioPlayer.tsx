"use client"
import React, { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.loop = true
      
      // Set volume and try to play immediately
      audio.volume = 0.5 // Optional: adjust volume
      const playAudio = async () => {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Playback failed:', error)
          setIsPlaying(false)
        }
      }
      
      playAudio()
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error('Error toggling play state:', error)
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={src} />
      <button
        onClick={togglePlay}
        className="bg-[#ff6b6b] hover:bg-[#ff8c8c] text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  )
}