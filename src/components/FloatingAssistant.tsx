'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  "Hey! I'm Kai — your data companion 🤖",
  "Explore Kunal's projects below! ↓",
  "Psst — check the Experience section!",
  "Need a data wizard? Hit Contact! ✉️",
  "50+ projects and counting... 🚀",
]

export default function FloatingAssistant() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [bounce, setBounce] = useState(false)

  const handleClick = () => {
    setBounce(true)
    setTimeout(() => setBounce(false), 600)
    setMsgIdx(prev => (prev + 1) % MESSAGES.length)
    setShowTip(true)
    setTimeout(() => setShowTip(false), 3500)
  }

  return (
    <div className="assistant-container">
      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            className="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {MESSAGES[msgIdx]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb */}
      <motion.div
        className="assistant-orb float-anim"
        onClick={handleClick}
        animate={bounce ? {
          scale: [1, 1.25, 0.9, 1.05, 1],
          rotate: [0, -8, 8, -4, 0],
        } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.12 }}
        data-hover
      >
        {/* Animated SVG — data node icon */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <motion.circle
            cx="12" cy="12" r="3"
            fill="#00f5ff"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
          <motion.line x1="12" y1="4" x2="12" y2="9" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0 }}
          />
          <motion.line x1="12" y1="15" x2="12" y2="20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
          />
          <motion.line x1="4" y1="12" x2="9" y2="12" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
          />
          <motion.line x1="15" y1="12" x2="20" y2="12" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
          />
          <circle cx="12" cy="4" r="1.5" fill="#00f5ff" fillOpacity="0.6"/>
          <circle cx="12" cy="20" r="1.5" fill="#a855f7" fillOpacity="0.6"/>
          <circle cx="4"  cy="12" r="1.5" fill="#00f5ff" fillOpacity="0.6"/>
          <circle cx="20" cy="12" r="1.5" fill="#a855f7" fillOpacity="0.6"/>
        </svg>
      </motion.div>
    </div>
  )
}
