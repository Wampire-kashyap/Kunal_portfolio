'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  videoUrl?: string
  fileUrl?: string
}

export default function VideoResume({ videoUrl, fileUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  if (!videoUrl && !fileUrl) return null // Hide if no video is provided

  // Determine if URL is YouTube
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be')
  let embedUrl = videoUrl
  if (isYouTube && videoUrl) {
    const videoId = videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 100,
          background: 'rgba(2,5,16,0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,245,255,0.3)',
          borderRadius: '50px',
          padding: '0.6rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#e2e8f0',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,245,255,0.15)',
        }}
      >
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingLeft: 2 // visual center for play icon
        }}>
          <svg width="10" height="12" viewBox="0 0 24 24" fill="#000">
            <path d="M3 22v-20l18 10-18 10z" />
          </svg>
        </div>
        Watch My Intro
      </motion.button>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              background: 'rgba(2,5,16,0.95)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
              style={{
                width: '100%',
                maxWidth: 900,
                aspectRatio: '16/9',
                background: '#000',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(0,245,255,0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1rem', right: '1rem',
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  width: 36, height: 36,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>

              {fileUrl ? (
                <video src={fileUrl} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
