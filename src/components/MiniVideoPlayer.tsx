'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  videoUrl?: string
  fileUrl?: string
}

export default function MiniVideoPlayer({ videoUrl, fileUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  if (!videoUrl && !fileUrl) return null

  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be')
  let embedUrl = videoUrl
  let thumbnailUrl = ''

  if (isYouTube && videoUrl) {
    const videoId = videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  return (
    <>
      <motion.div
        className="glass-card"
        whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0, 245, 255, 0.2)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          marginTop: '2rem',
          border: '1px solid rgba(0,245,255,0.2)',
        }}
      >
        {/* Background Thumbnail */}
        {thumbnailUrl ? (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
            filter: 'blur(2px) grayscale(30%)',
            transition: 'all 0.3s ease'
          }} className="video-thumb" />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(168,85,247,0.1))',
          }} />
        )}

        {/* Play Button Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(2, 5, 16, 0.4)',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(0, 245, 255, 0.15)',
            border: '2px solid #00f5ff',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
            marginBottom: '1rem',
            paddingLeft: 4, // visual alignment for play icon
            transition: 'transform 0.3s ease'
          }} className="play-btn">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="#00f5ff">
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}>
            Watch Video Resume
          </span>
        </div>
      </motion.div>

      {/* Modal Player */}
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
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 1000,
                aspectRatio: '16/9',
                background: '#000',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(0,245,255,0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                  width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
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
